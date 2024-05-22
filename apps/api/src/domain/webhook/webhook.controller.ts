import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get()
  async findAll() {
    return await this.webhookService.findAll();
  }

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    return await this.webhookService.create(payload);
  }
}
