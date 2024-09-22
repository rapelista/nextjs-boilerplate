import { DashboardDetail } from '~/components/dashboard/detail';
import { auth } from '~/lib/auth';

export default async function Page() {
  const session = await auth();

  return (
    <>
      <h1>Dashboard Page</h1>
      {session && <DashboardDetail name={session?.user?.name ?? ''} />}
    </>
  );
}
