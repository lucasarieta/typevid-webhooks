import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createWebhook } from '../api/create-webhook';
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewWebhookDialog({ open, onOpenChange }: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FieldValues) {
    const webhook = await createWebhook(data);
    const webhooksListCache = queryClient.getQueriesData({
      queryKey: ['webhooks'],
    });

    webhooksListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData(cacheKey, (webhooks: Webhook[]) => {
        return [...webhooks, webhook];
      });
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Webhook</DialogTitle>
          <DialogDescription>Add a new webhook</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='name' className='text-right'>
                Name
              </label>
              <input
                id='name'
                className='col-span-3 py-2 px-3 text-white bg-zinc-800 outline-none rounded-lg ring-1 ring-zinc-500/50 text-sm'
                placeholder='Webhook Name'
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
              {form.formState.isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
