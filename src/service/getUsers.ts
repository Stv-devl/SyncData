import { UserType } from '../types/type';

/**
 * apiGet function
 * Fetches user data from the API endpoint and returns it. Logs an error if the fetch operation fails.
 * @async
 * @returns {Promise<{ users: UserType[] }>} - The data fetched from the API.
 * @throws {Error} - If there is a problem with the fetch operation.
 */
const getUsers = async (): Promise<{ users: UserType[] }> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${url}. Status: ${response.status}`
      );
    }
    const users: UserType[] = await response.json();
    console.log('Users fetched successfully');
    return { users };
  } catch (error: unknown) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};

export default getUsers;
