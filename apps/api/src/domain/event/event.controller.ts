import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WebhookRetryService } from '../webhook/webhook-retry.service';
import { WebhookService } from '../webhook/webhook.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly webhookRetryService: WebhookRetryService,
  ) {}

  @Post()
  async create(@Body() payload: CreateEventDto) {
    const webhooks = await this.webhookService.findByEventType(
      payload.eventType,
    );
    try {
      await this.webhookRetryService.retryWebhooks(webhooks, payload);
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'Failed to send the event to all webhooks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
