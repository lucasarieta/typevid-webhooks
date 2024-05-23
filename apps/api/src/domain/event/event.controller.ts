import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import axios from 'axios';
import { DLQService } from 'src/dlq/dlq.service';
import { WebhookService } from '../webhook/webhook.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly dlqService: DLQService,
  ) {}

  private async sendEventToWebhook(
    webhookUrl: string,
    payload: CreateEventDto,
    retries: number = 3,
  ): Promise<any> {
    try {
      const response = await axios.post(webhookUrl, payload, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (retries > 0) {
        console.error(
          `Erro ao enviar evento para ${webhookUrl}. Tentando novamente...`,
        );
        return this.sendEventToWebhook(webhookUrl, payload, retries - 1);
      } else {
        console.error(
          `Erro ao enviar evento para ${webhookUrl} após ${retries} tentativas. Enviando para DLQ.`,
        );
        await this.dlqService.addToQueue({
          url: webhookUrl,
          message: payload.message,
          eventType: payload.eventType,
        });
        throw error;
      }
    }
  }

  @Post()
  async create(@Body() payload: CreateEventDto) {
    const webhooks = await this.webhookService.findByEventType(
      payload.eventType,
    );
    const promises = webhooks.map((webhook) =>
      this.sendEventToWebhook(webhook.url, payload),
    );

    try {
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw new HttpException(
        'Falha ao enviar o evento para todos os webhooks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
