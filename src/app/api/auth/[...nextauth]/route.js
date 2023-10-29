import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
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

        console.log({
          username, password, USERNAME_SECRET, PASSWORD_SECRET,
        });

        if (username != USERNAME_SECRET || password != PASSWORD_SECRET) {
          return null;
        }

        return { username, password };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
