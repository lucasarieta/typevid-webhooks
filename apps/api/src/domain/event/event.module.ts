import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { DLQService } from 'src/dlq/dlq.service';
import { WebhookModule } from '../webhook/webhook.module';
import { WebhookRepository } from '../webhook/webhook.repository';
import { WebhookService } from '../webhook/webhook.service';
import { EventController } from './event.controller';

@Module({
  imports: [WebhookModule],
  controllers: [EventController],
  providers: [WebhookService, WebhookRepository, PrismaService, DLQService],
})
export class EventModule {}
