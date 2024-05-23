import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { DLQService } from '../../dlq/dlq.service';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { WebhookRetryService } from './webhook-retry.service';

jest.mock('axios');

describe('WebhookRetryService', () => {
  let service: WebhookRetryService;
  let dlqService: DLQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookRetryService,
        {
          provide: DLQService,
          useValue: {
            addToQueue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WebhookRetryService>(WebhookRetryService);
    dlqService = module.get<DLQService>(DLQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('retryWebhooks', () => {
    it('should retry sending events to all webhooks', async () => {
      const webhooks = [
        { url: 'http://example.com/webhook1' },
        { url: 'http://example.com/webhook2' },
      ];
      const payload: CreateEventDto = {
        eventType: 'VIEW_ITEM',
        message: 'test message',
      };

      await service.retryWebhooks(webhooks, payload);

      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenNthCalledWith(
        1,
        'http://example.com/webhook1',
        payload,
        { timeout: 10000 },
      );
      expect(axios.post).toHaveBeenNthCalledWith(
        2,
        'http://example.com/webhook2',
        payload,
        { timeout: 10000 },
      );
    });

    it('should send failed events to DLQ if all retries fail', async () => {
      const webhooks = [{ url: 'http://example.com/webhook1' }];
      const payload: CreateEventDto = {
        eventType: 'VIEW_ITEM',
        message: 'test message',
      };

      jest
        .spyOn(axios, 'post')
        .mockRejectedValue(new Error('Failed to send event'));

      await expect(service.retryWebhooks(webhooks, payload, 3)).rejects.toThrow(
        'Failed to send event',
      );
      expect(dlqService.addToQueue).toHaveBeenCalledTimes(1);
      expect(dlqService.addToQueue).toHaveBeenCalledWith({
        url: 'http://example.com/webhook1',
        message: 'test message',
        eventType: 'VIEW_ITEM',
      });
    });
  });
});
