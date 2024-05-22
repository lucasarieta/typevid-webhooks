import { PlusIcon, WebhookIcon } from 'lucide-react';

export function Header() {
  return (
    <header className='flex items-center justify-between'>
      <div className='full-center gap-2 p-4'>
        <WebhookIcon size={32} />
        <h1 className='font-bold text-lg'>Gerênciamento de Webhooks</h1>
      </div>

      <button className='bg-white text-black px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80'>
        <PlusIcon />
        Novo Webhook
      </button>
    </header>
  );
}
