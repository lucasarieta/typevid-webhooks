import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    return await this.prismaService.webhook.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async findByEventType(eventType: string) {
    return await this.prismaService.webhook.findMany({
      where: {
        eventType: eventType,
        isDeleted: false,
      },
    });
  }

  async create(payload: CreateWebhookDto) {
    return await this.prismaService.webhook.create({
      data: payload,
    });
  }

  async update(id: string, payload: UpdateWebhookDto) {
    return await this.prismaService.webhook.update({
      where: {
        id: id,
      },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this.prismaService.webhook.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
