import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateWebhook } from '../api/update-webhook';
import { queryClient } from '../lib/react-query';
import { WEBHOOK_EVENT_TYPES, Webhook } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const schema = z.object({
  name: z.string().min(3).max(50),
  url: z.string().min(3).max(255),
  eventType: z.string().min(3).max(50),
});

interface Props {
  webhook: Webhook | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditWebhookDialog({ webhook, open, onOpenChange }: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: webhook?.name,
      url: webhook?.url,
      eventType: webhook?.eventType,
    },
  });

  async function onSubmit(data: FieldValues, webhook: Webhook | null) {
    if (!webhook) return;

    const newWebhook: Webhook = { ...webhook, ...data };

    await updateWebhook(newWebhook);
    const webhooksListCache = queryClient.getQueriesData({
      queryKey: ['webhooks'],
    });

    webhooksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData(cacheKey, (webhooks: Webhook[]) => {
        return webhooks.map((webhook) => {
          if (webhook.id === newWebhook.id) {
            return newWebhook;
          }

          return webhook;
        });
      });
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editing webhook {webhook?.name}</DialogTitle>
          <DialogDescription>Edit the webhook details</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit((data) => onSubmit(data, webhook))}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='name' className='text-right'>
                Name
              </label>
              <input
                id='name'
                className='col-span-3 py-2 px-3 text-white bg-zinc-800 outline-none rounded-lg ring-1 ring-zinc-500/50 text-sm'
                placeholder='Webhook Name'
                defaultValue={webhook?.name}
                {...form.register('name')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='url' className='text-right'>
                Url
              </label>
              <input
                id='url'
                className='col-span-3 py-2 px-3 text-white outline-none bg-zinc-800 rounded-lg ring-1 ring-zinc-500/50 text-sm'
                placeholder='Webhook Url'
                defaultValue={webhook?.url}
                {...form.register('url')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='eventType' className='text-right'>
                Event Type
              </label>

              <Controller
                name='eventType'
                control={form.control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-[180px] col-span-3'>
                      <SelectValue placeholder='Event Type' />
                    </SelectTrigger>
                    <SelectContent>
                      {WEBHOOK_EVENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <button
              disabled={form.formState.isSubmitting}
              className='bg-white text-black px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80 outline-none disabled:opacity-80 disabled:cursor-not-allowed'
            >
              {form.formState.isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
