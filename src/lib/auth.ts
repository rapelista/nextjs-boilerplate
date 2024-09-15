import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'user-login',
      name: 'User Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password }) => {
        /**
         * @todo: Request to backend and get JWT.
         */
        if (!(username === 'superadmin' && password === 'superadmin')) {
          return null;
        }

        return {
          name: 'John Doe',
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
});
