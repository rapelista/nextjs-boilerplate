import { redirect } from 'next/navigation';
import { UserMenu } from '~/components/detail';
import { auth } from '~/lib/auth';

export default async function Page() {
  const session = await auth();

  if (!session) redirect('/auth/login');

  return (
    <>
      <h1>Dashboard Page</h1>
      <hr />
      <UserMenu name={session?.user?.name ?? ''} />
    </>
  );
}
