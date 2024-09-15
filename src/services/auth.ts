import { generateApiUrl } from '~/lib/utils/api';
import { request } from '~/services/api';
import { LoginBodyType } from '~/types/auth';

export async function login(creds: LoginBodyType) {
  const url = generateApiUrl('/auths/login');

  return await request(url, {
    method: 'POST',
    body: JSON.stringify(creds),
  });
}

export async function refresh(data: { refreshToken: string }) {
  const url = generateApiUrl('/auths/refresh');

  /**
   * The following code is the same as the one in the `request` function. But, request function include Authorization Bearer to the header. So we need to use fetch directly.
   */
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
