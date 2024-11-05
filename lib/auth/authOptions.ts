import { ChangeUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { config } from './../config';
import { getUserByEmail, verifyPassword } from './authHelpers';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.googleClientId!,
      clientSecret: config.googleClientSecret!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password must be provided');
        }
        const user = (await getUserByEmail(
          credentials.email
        )) as ChangeUser | null;

        if (!user) {
          throw new Error('No user found with that email');
        }

        const hashedPassword = user.credentials.password;

        if (!hashedPassword) {
          throw new Error('Password is missing for this user');
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          hashedPassword
        );

        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },

  secret: config.secretKey,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as ChangeUser)._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user = session.user || {};
        (session.user as Record<string, unknown>).id = token.userId;
      }
      return session;
    },
  },
};
