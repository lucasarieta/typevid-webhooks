import { api } from '../lib/api';

export async function deleteWebhook(id: string) {
  const response = await api.delete(`/webhook/${id}`);
  return response.data;
}
