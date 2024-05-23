import { useState } from 'react';
import { deleteWebhook } from '../api/delete-webhook';
import { queryClient } from '../lib/react-query';
import { formatDate } from '../lib/utils';
import { Webhook } from '../types';
import { TableCell, TableRow } from './ui/table';

interface Props {
  webhook: Webhook;
  onEdit: (webhook: Webhook) => void;
}

export function WebhooksTableRow({ webhook, onEdit }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete() {
    if (isDeleting) return;

    setIsDeleting(true);

    await deleteWebhook(webhook.id);

    const webhooksListCache = queryClient.getQueriesData({
      queryKey: ['webhooks'],
    });

    webhooksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData(cacheKey, (webhooks: Webhook[]) => {
        return webhooks.filter((w) => w.id !== webhook.id);
      });
    });

    setIsDeleting(false);
  }

  return (
    <TableRow>
      <TableCell className='max-w-[140px] truncate'>{webhook.name}</TableCell>
      <TableCell>{webhook.eventType}</TableCell>
      <TableCell>{'Never'}</TableCell>
      <TableCell>{formatDate(webhook.createdAt)}</TableCell>
      <TableCell className='flex items-center gap-2'>
        <button
          onClick={() => onEdit(webhook)}
          className='bg-white text-black px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80 outline-none disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleting}
          className='bg-red-800 text-white px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80 outline-none disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Delete
        </button>
      </TableCell>
    </TableRow>
  );
}
