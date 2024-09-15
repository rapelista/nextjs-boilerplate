import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, refresh } from '~/services/auth';
import { LoginBodyType, TokenType } from '~/types/auth';
import { decodeJWT } from './utils/jwt';

declare module '@auth/core/jwt' {
  interface JWT extends TokenType {}
}

declare module 'next-auth' {
  interface User extends TokenType {}
  interface Session extends TokenType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'user-login',
      name: 'User Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as LoginBodyType;

        if (!username || !password) {
          return null;
        }

        try {
          return await login({ username, password });
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    /**
     * The maxAge is the number of seconds that the session will be valid.
     * In this case, it will be valid for 24 hours.
     */
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      /**
       * Initial call. `user` exists when the user is logged in.
       */
      if (user) {
        return {
          data: user.data,
        };
      }

      /**
       * Subsequent calls. `user` is null when the user access the app.
       * @todo: Check if the token is expired and refresh it.
       */

      const now = Math.floor(Date.now() / 1000);
      const { exp } = decodeJWT(token?.data?.accessToken);

      if (now < (exp as number)) {
        return token;
      }

      /**
       * If the token is expired, refresh it.
       */
      return await refresh({
        refreshToken: token?.data?.refreshToken,
      });
    },
    session: async ({ token, session }) => {
      /**
       * Initial call. `token` exists when the user is logged in.
       */
      if (token) {
        const decoded = decodeJWT(token?.data?.accessToken);

        return {
          ...session,
          user: {
            ...session.user,
            /**
             * Insert the user data into the session.
             */
            name: decoded.username,
          },
          data: token.data,
        };
      }

      /**
       * Subsequent calls. `token` is null when the user access the app.
       */

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
