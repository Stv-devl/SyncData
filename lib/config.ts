/**
 * Configuration object for the application
 */
export const config = {
  secretKey: process.env.NEXTAUTH_SECRET as string,
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
