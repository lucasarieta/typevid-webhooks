import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DLQService } from '../../dlq/dlq.service';
import { CreateEventDto } from '../event/dto/create-event.dto';

@Injectable()
export class WebhookRetryService {
  constructor(private readonly dlqService: DLQService) {}

  async retryWebhooks(webhooks: any[], payload: CreateEventDto, retries = 3) {
    const promises = webhooks.map((webhook) =>
      this.sendEventToWebhook(webhook.url, payload, retries),
    );
    await Promise.all(promises);
  }

  private async sendEventToWebhook(
    webhookUrl: string,
    payload: CreateEventDto,
    retries: number,
  ): Promise<void> {
    try {
      await axios.post(webhookUrl, payload, { timeout: 10000 });
    } catch (error) {
      if (retries > 0) {
        console.error(`Error sending event to ${webhookUrl}. Retrying...`);
        await this.sendEventToWebhook(webhookUrl, payload, retries - 1);
      } else {
        console.error(
          `Failed to send event to ${webhookUrl} after 3 attempts. Sending to DLQ.`,
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
}
