export interface Webhook {
  id: string;
  name: string;
  url: string;
  eventType: string;
  lastTriggeredAt?: string;
  createdAt: string;
}

export const WEBHOOK_EVENT_TYPES = [
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
];
