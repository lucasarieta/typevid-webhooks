import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

@Injectable()
export class DLQService {
  private readonly sqs: SQSClient;

  constructor(private configService: ConfigService) {
    this.sqs = new SQSClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async addToQueue(payload: unknown): Promise<void> {
    const params = {
      QueueUrl: this.configService.get<string>('AWS_QUEUE_URL'),
      MessageBody: JSON.stringify(payload),
    };

    try {
      await this.sqs.send(new SendMessageCommand(params));
    } catch (error) {
      console.error('Failed to add a new message to SQS queue:', error);
      throw error;
    }
  }
}
