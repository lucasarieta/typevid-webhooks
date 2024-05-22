import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getWebhooks } from './api/get-webhooks';
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

export default function App() {
  const [isCreatingWebhook, setIsCreatingWebhook] = useState(false);

  const {
    data: result,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => getWebhooks(),
  });

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !result && <WebhooksTableSkeleton />}

              {result &&
                result.map((webhook) => {
                  return (
                    <WebhooksTableRow key={webhook.id} webhook={webhook} />
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
    </>
  );
}
