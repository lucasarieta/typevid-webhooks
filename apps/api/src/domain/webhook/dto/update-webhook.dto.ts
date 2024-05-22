import { IsOptional } from 'class-validator';

export class UpdateWebhookDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  url?: string;

  @IsOptional()
  eventType?: string;
}
