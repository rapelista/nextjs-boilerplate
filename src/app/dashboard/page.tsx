import { DashboardDetail } from '~/components/dashboard/detail';
import { auth } from '~/lib/auth';

export default async function Page() {
  const session = await auth();

  return (
    <>
      Dashboard Page
      {session && <DashboardDetail name={session?.user?.name ?? ''} />}
    </>
  );
}
