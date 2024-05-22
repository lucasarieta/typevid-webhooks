import { Header } from './components/header';
import { Layout } from './components/layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/table';

export default function App() {
  return (
    <Layout>
      <Header />

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
            <TableRow>
              <TableCell className='max-w-[140px] truncate'>
                <a href='https://webhook.site/1' target='_blank'>
                  https://webhook.site/1
                </a>
              </TableCell>

              <TableCell>ADD_SHIPPING</TableCell>
              <TableCell>2021-09-01 10:00:00</TableCell>
              <TableCell>2021-09-01 10:00:00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='max-w-[140px] truncate'>
                <a href='https://webhook.site/1' target='_blank'>
                  https://webhook.site/1
                </a>
              </TableCell>

              <TableCell>order.created</TableCell>
              <TableCell>2021-09-01 10:00:00</TableCell>
              <TableCell>2021-09-01 10:00:00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
