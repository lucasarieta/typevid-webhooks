import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../db/prisma.service';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: WebhookService;

  const webhookServiceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        { provide: WebhookService, useValue: webhookServiceMock },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of webhooks', async () => {
      const result = [
        {
          id: '1',
          name: 'Webhook 1',
          eventType: 'VIEW_ITEM',
          createdAt: new Date(),
          url: 'http://localhost:3000/webhook1',
          isDeleted: false,
        },
        {
          id: '2',
          name: 'Webhook 2',
          eventType: 'VIEW_ITEM',
          createdAt: new Date(),
          url: 'http://localhost:3000/webhook2',
          isDeleted: false,
        },
      ];
      webhookServiceMock.findAll.mockResolvedValue(result);

      const response = await controller.findAll();
      expect(response).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a webhook', async () => {
      const result = {
        id: '1',
        name: 'Webhook 1',
        eventType: 'VIEW_ITEM',
        createdAt: new Date(),
        url: 'http://localhost:3000/webhook1',
        isDeleted: false,
      };
      webhookServiceMock.create.mockResolvedValue(result);

      const response = await controller.create({
        name: 'Webhook 1',
        eventType: 'VIEW_ITEM',
        url: 'http://localhost:3000/webhook1',
      });
      expect(response).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a webhook', async () => {
      const result = {
        id: '1',
        name: 'Webhook 1',
        eventType: 'VIEW_ITEM',
        createdAt: new Date(),
        url: 'http://localhost:3000/webhook1',
        isDeleted: false,
      };
      webhookServiceMock.update.mockResolvedValue(result);

      const response = await controller.update('/1', {
        name: 'Webhook 1',
        eventType: 'VIEW_ITEM',
        url: 'http://localhost:3000/webhook1',
      });
      expect(response).toBe(result);
    });
  });
});
