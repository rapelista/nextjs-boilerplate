import { redirect } from 'next/navigation';
import { UserMenu } from '~/components/user-menu';
import { auth } from '~/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/auth/login');

  return (
    <>
      <header
        style={{
          padding: '0 12px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h1>Boilerplate</h1>
        <UserMenu name={session?.user?.name ?? ''} />
      </header>
      <main style={{ padding: 12 }}>{children}</main>
    </>
  );
}
