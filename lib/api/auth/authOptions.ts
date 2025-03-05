import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { config } from '../../config';
import { clientPromise } from '../../mongod';
import { getUserByEmail, verifyPassword } from './authHelpers';

/**
 * Configuration options for NextAuth authentication
 * @type {NextAuthOptions}
 */
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

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

        const userDoc = await getUserByEmail(credentials.email);
        if (!userDoc) {
          throw new Error('No user found with that email');
        }

        const hashedPassword = userDoc.credentials.password;
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
        const idAsString = userDoc._id.toString();

        const user = {
          ...userDoc,
          id: idAsString,
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },

  secret: config.secretKey,

  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db('syncData');
        const usersCollection = db.collection('users');

        await usersCollection.updateOne(
          { _id: new ObjectId(user.id) },
          {
            $set: {
              credentials: {
                email: user.email || '',
                password: '',
              },
              profile: {
                firstname: '',
                lastname: '',
                image: '',
                email: user.email || '',
                subscription: 'free',
              },
              files: [],
              createdAt: new Date(),
            },
          }
        );
      } catch (error) {
        console.error('Error customizing new user doc:', error);
      }
    },
  },
};
