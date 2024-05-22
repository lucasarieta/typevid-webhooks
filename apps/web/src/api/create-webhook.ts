import { api } from '../lib/api';

export async function createWebhook(data: unknown) {
  const response = await api.post('/webhook', data);
  return response.data;
}
