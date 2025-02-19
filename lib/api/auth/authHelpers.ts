import bcrypt from 'bcryptjs';
import { clientPromise } from '../../mongod';

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
