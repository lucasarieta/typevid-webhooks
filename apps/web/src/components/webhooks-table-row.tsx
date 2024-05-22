import { formatDate } from '../lib/utils';
import { Webhook } from '../types';
import { TableCell, TableRow } from './ui/table';

interface Props {
  webhook: Webhook;
  onEdit: (webhook: Webhook) => void;
}

export function WebhooksTableRow({ webhook, onEdit }: Props) {
  return (
    <TableRow>
      <TableCell className='max-w-[140px] truncate'>{webhook.name}</TableCell>
      <TableCell>{webhook.eventType}</TableCell>
      <TableCell>{webhook.lastTriggeredAt ?? 'Never'}</TableCell>
      <TableCell>{formatDate(webhook.createdAt)}</TableCell>
      <TableCell>
        <button
          onClick={() => onEdit(webhook)}
          className='bg-white text-black px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80 outline-none disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Edit
        </button>
      </TableCell>
    </TableRow>
  );
}
