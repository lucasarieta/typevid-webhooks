import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from '../event/event.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WebhookModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
