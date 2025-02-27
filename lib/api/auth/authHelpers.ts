import bcrypt from 'bcryptjs';
import { clientPromise } from '../../mongod';

/**
 * Fetches a user from the database by their email address
 * @param email - The email address to search for
 * @returns The user object if found, null otherwise
 */
export const getUserByEmail = async (email: string) => {
  try {
    const client = await clientPromise;
    const db = client.db('syncData');
    const user = await db
      .collection('users')
      .findOne({ 'credentials.email': email });

    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Could not fetch user');
  }
};

/**
 * Verifies if an input password matches a stored hashed password
 * @param inputPassword - The password to verify
 * @param storedPassword - The hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);

    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Password verification failed');
  }
};
