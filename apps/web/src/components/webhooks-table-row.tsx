import { formatDate } from '../lib/utils';
import { Webhook } from '../types';
import { TableCell, TableRow } from './ui/table';

interface Props {
  webhook: Webhook;
}

export function WebhooksTableRow({ webhook }: Props) {
  return (
    <TableRow>
      <TableCell className='max-w-[140px] truncate'>{webhook.name}</TableCell>
      <TableCell>{webhook.eventType}</TableCell>
      <TableCell>{webhook.lastTriggeredAt ?? 'Never'}</TableCell>
      <TableCell>{formatDate(webhook.createdAt)}</TableCell>
    </TableRow>
  );
}
