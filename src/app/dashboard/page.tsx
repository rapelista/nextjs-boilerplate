import { redirect } from 'next/navigation';
import { DashboardDetail } from '~/components/dashboard/detail';
import { auth } from '~/lib/auth';

export default async function Page() {
  const session = await auth();

  if (!session) redirect('/auth/login');

  return (
    <>
      <h1>Dashboard Page</h1>
      <hr />
      <DashboardDetail name={session?.user?.name ?? ''} />
    </>
  );
}
