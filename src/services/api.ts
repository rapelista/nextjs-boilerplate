import { getSession, signOut } from 'next-auth/react';
import { auth, signOut as signOutServer } from '~/lib/auth';
import { RequestMethodType } from '~/types/api';

export async function request(
  url: string,
  init?: RequestInit & { method?: RequestMethodType },
  withoutAuth = false
) {
  const isClientSide = typeof window !== 'undefined';

  /**
   * Default headers for the request.
   */
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  /**
   * Get the current session if it exists.
   * Session based on the client-side or server-side.
   */
  let session;

  if (isClientSide) {
    session = await getSession();
  } else {
    session = await auth();
  }

  /**
   * If the session exists, add the access token to the headers.
   */
  if (!withoutAuth && session) {
    headers['Authorization'] = `Bearer ${session?.data?.accessToken}`;
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
  });

  /**
   * Let's handle the response based on the response status and status code.
   */
  if (res.ok) {
    switch (res.status) {
      /**
       * No content.
       */
      case 204:
        break;

      /**
       * OK.
       */
      default:
        return await res.json();
    }
  } else {
    switch (res.status) {
      /**
       * Unauthorized.
       */
      case 401:
        if (session) {
          if (isClientSide) {
            await signOut();
          } else {
            await signOutServer();
          }

          break;
        }

      /**
       * Other status codes.
       */
      default:
        return null;
    }
  }
}
