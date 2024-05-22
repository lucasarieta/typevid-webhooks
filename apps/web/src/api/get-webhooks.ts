import { api } from '../lib/api';
import { Webhook } from '../types';

export async function getWebhooks(): Promise<Webhook[]> {
  const response = await api.get('/webhook');
  return response.data;
}
