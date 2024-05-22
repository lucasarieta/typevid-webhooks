import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { WebhookRepository } from './webhook.repository';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  async findAll() {
    return await this.webhookRepository.findMany();
  }

  async create(payload: CreateCustomerDto) {
    return await this.webhookRepository.create(payload);
  }
}
