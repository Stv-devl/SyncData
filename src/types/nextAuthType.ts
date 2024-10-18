import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    userId: string;
  }

  interface ChangeUser extends User {
    _id: string;
    credentials: {
      password: string;
    };
  }
}
