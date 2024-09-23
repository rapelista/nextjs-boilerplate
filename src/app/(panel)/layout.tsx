import { Text } from '@mantine/core';
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
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ccc',
        }}
      >
        <Text fz="h1">Boilerplate</Text>
        <UserMenu name={session?.user?.name ?? ''} />
      </header>
      <main style={{ padding: 12 }}>{children}</main>
    </>
  );
}
