/**
 * Sends a sign-up request to the server with the user's details and returns the created user data.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Users>} The created user data returned from the server.
 * @throws {Error} If the sign-up request fails.
 */
const postSignup = async (
  email: string,
  password: string
): Promise<{ token: string; userId: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Signup failed with status', response.status, errorDetails);
      throw new Error(`Signup failed: ${errorDetails}`);
    }
    const data = await response.json();
    console.log('Signup successful', data);

    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export default postSignup;
