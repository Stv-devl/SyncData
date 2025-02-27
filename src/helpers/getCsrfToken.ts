/**
 * Gets the CSRF token from the server
 * @returns {Promise<string | null>} The CSRF token or null if an error occurs
 */
export async function getCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/files', {
      method: 'GET',
      credentials: 'include',
    });

    const csrfToken = response.headers.get('X-CSRF-Token');

    return csrfToken;
  } catch (error) {
    console.error('Error retrieving CSRF token:', error);
    return null;
  }
}
