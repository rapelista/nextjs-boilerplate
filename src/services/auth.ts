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
