import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const configAuth = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        const { USERNAME_SECRET, PASSWORD_SECRET } = process.env;

        if (username != USERNAME_SECRET || password != PASSWORD_SECRET) {
          return null;
        }

        return { username, password };
      },
    }),
  ],
  callbacks: {
    jwt({
      token, user,
    }) {
      if (user) token.user = user;
      return token;
    },
    session({ token, session }) {
      const {
        user,
      } = token;
      session.user = {
        user,
      };
      return session;
    },
  },
};

const handler = NextAuth(configAuth);

export { handler as GET, handler as POST };
