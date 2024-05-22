import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

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

  async create(payload: CreateCustomerDto) {
    return await this.prismaService.webhook.create({
      data: payload,
    });
  }
}
