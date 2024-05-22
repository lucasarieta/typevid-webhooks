import { api } from '../lib/api';
import { Webhook } from '../types';

export async function updateWebhook(data: Webhook) {
  const response = await api.patch(`/webhook/${data.id}`, data);
  return response.data;
}
