import { decode, JwtPayload } from 'jsonwebtoken';

export function decodeJWT(token: string) {
  return decode(token) as JwtPayload;
}
