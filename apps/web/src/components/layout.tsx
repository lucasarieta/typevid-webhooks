interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className='mx-auto max-w-4xl mt-4 flex flex-col gap-4'>{children}</div>
  );
}
