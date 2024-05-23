import { Module } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { DLQService } from '../../dlq/dlq.service';
import { WebhookRetryService } from '../webhook/webhook-retry.service';
import { WebhookModule } from '../webhook/webhook.module';
import { WebhookRepository } from '../webhook/webhook.repository';
import { WebhookService } from '../webhook/webhook.service';
import { EventController } from './event.controller';

@Module({
  imports: [WebhookModule],
  controllers: [EventController],
  providers: [
    WebhookService,
    WebhookRepository,
    PrismaService,
    DLQService,
    WebhookRetryService,
  ],
})
export class EventModule {}
