import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WebhookRetryService } from '../webhook/webhook-retry.service';
import { WebhookService } from '../webhook/webhook.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventController } from './event.controller';

describe('EventController', () => {
  let controller: EventController;
  let webhookService: WebhookService;
  let webhookRetryService: WebhookRetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: WebhookService,
          useValue: {
            findByEventType: jest.fn() as jest.MockedFunction<
              WebhookService['findByEventType']
            >,
          },
        },
        {
          provide: WebhookRetryService,
          useValue: {
            retryWebhooks: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    webhookService = module.get<WebhookService>(WebhookService);
    webhookRetryService = module.get<WebhookRetryService>(WebhookRetryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call webhookService.findByEventType and webhookRetryService.retryWebhooks', async () => {
      const payload: CreateEventDto = {
        eventType: 'VIEW_ITEM',
        message: 'test message',
      };
      const webhooks = [
        {
          id: '1',
          eventType: 'VIEW_ITEM',
          name: 'Hello World',
          url: 'http://example.com/webhook',
          createdAt: new Date(),
          isDeleted: false,
        },
      ];
      jest.spyOn(webhookService, 'findByEventType').mockResolvedValue(webhooks);

      await controller.create(payload);

      expect(webhookService.findByEventType).toHaveBeenCalledWith('VIEW_ITEM');
      expect(webhookRetryService.retryWebhooks).toHaveBeenCalledWith(
        webhooks,
        payload,
      );
    });

    it('should throw an error if retryWebhooks throws an error', async () => {
      const payload: CreateEventDto = {
        eventType: 'VIEW_ITEM',
        message: 'test message',
      };

      const webhooks = [
        {
          id: '1',
          eventType: 'VIEW_ITEM',
          name: 'Hello World',
          url: 'http://example.com/webhook',
          createdAt: new Date(),
          isDeleted: false,
        },
      ];

      jest.spyOn(webhookService, 'findByEventType').mockResolvedValue(webhooks);
      jest
        .spyOn(webhookRetryService, 'retryWebhooks')
        .mockRejectedValue(new Error('Failed to retry webhooks'));

      await expect(controller.create(payload)).rejects.toThrow(
        new HttpException(
          'Failed to send the event to all webhooks',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
