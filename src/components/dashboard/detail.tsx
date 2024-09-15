'use client';

import { signOut } from 'next-auth/react';

export function DashboardDetail({ name }: { name?: string }) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <div>name: {name}</div>
      <hr />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
