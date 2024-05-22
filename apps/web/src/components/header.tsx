import { PlusIcon, WebhookIcon } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function Header({ onClick }: Props) {
  return (
    <header className='flex items-center justify-between'>
      <div className='full-center gap-2 p-4'>
        <WebhookIcon size={32} />
        <h1 className='font-bold text-lg'>Webhooks Manager</h1>
      </div>

      <button
        onClick={onClick}
        className='bg-white text-black px-3 py-1.5 rounded-lg full-center gap-2 hover:opacity-80 outline-none'
      >
        <PlusIcon />
        New Webhook
      </button>
    </header>
  );
}
