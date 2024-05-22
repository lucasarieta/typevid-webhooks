import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getWebhooks } from './api/get-webhooks';
import { EditWebhookDialog } from './components/edit-webhook-dialog';
import { Header } from './components/header';
import { Layout } from './components/layout';
import { NewWebhookDialog } from './components/new-webhook-dialog';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { WebhooksTableRow } from './components/webhooks-table-row';
import WebhooksTableSkeleton from './components/webhooks-table-skeleton';
import { Webhook } from './types';

export default function App() {
  const [isCreatingWebhook, setIsCreatingWebhook] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null);

  const {
    data: result,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => getWebhooks(),
  });

  function onInitWebhookEdition(webhook: Webhook) {
    setEditingWebhook(webhook);
  }

  return (
    <>
      <Layout>
        <Header onClick={() => setIsCreatingWebhook(true)} />

        <div className='border border-zinc-500/50 select-none rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[140px]'>Name</TableHead>
                <TableHead className='w-[140px]'>Event Type</TableHead>
                <TableHead className='w-[140px]'>Last Triggered At</TableHead>
                <TableHead className='w-[140px]'>Created At</TableHead>
                <TableHead className='w-[80px]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !result && <WebhooksTableSkeleton />}

              {result &&
                result.map((webhook) => {
                  return (
                    <WebhooksTableRow
                      key={webhook.id}
                      webhook={webhook}
                      onEdit={onInitWebhookEdition}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Layout>

      <NewWebhookDialog
        open={isCreatingWebhook}
        onOpenChange={setIsCreatingWebhook}
      />

      <EditWebhookDialog
        webhook={editingWebhook}
        open={!!editingWebhook}
        onOpenChange={() => setEditingWebhook(null)}
      />
    </>
  );
}
