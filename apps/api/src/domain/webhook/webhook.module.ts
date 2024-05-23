import { Module } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { WebhookController } from './webhook.controller';
import { WebhookRepository } from './webhook.repository';
import { WebhookService } from './webhook.service';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookRepository, PrismaService],
})
export class WebhookModule {}
