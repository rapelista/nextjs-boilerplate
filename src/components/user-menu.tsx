'use client';

import { signOut } from 'next-auth/react';

export function UserMenu({ name }: { name?: string }) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <p>{name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
