import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { WebhookRepository } from './webhook.repository';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  async findAll() {
    return await this.webhookRepository.findMany();
  }

  async findByEventType(eventType: string) {
    return await this.webhookRepository.findByEventType(eventType);
  }

  async create(payload: CreateWebhookDto) {
    return await this.webhookRepository.create(payload);
  }

  async update(id: string, payload: UpdateWebhookDto) {
    return await this.webhookRepository.update(id, payload);
  }

  async delete(id: string) {
    return await this.webhookRepository.delete(id);
  }
}
