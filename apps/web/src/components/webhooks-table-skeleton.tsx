import { Skeleton } from './ui/skeleton';
import { TableCell, TableRow } from './ui/table';

export default function WebhooksTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell className='font-medium'>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>

            <TableCell>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>

            <TableCell className='font-medium'>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>

            <TableCell>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
