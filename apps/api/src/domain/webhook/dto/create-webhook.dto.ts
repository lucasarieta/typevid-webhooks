import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateWebhookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsIn([
    'VIEW_ITEM',
    'VIEW_ITEM_LIST',
    'ADD_TO_CART',
    'VIEW_CART',
    'REMOVE_FROM_CART',
    'ADD_TO_WISHLIST',
    'BEGIN_CHECKOUT',
    'ADD_PAYMENT_INFO',
    'ADD_SHIPPING_INFO',
    'PURCHASE',
  ])
  eventType: string;
}
