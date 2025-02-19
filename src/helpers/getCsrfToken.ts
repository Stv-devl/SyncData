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
