import { generateApiUrl } from '~/lib/api';
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

  return await request(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    true
  );
}
