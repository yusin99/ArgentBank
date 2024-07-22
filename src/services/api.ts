/** Base URL for user-related API endpoints */
const BASE_URL = 'http://localhost:3001/api/v1/user';

/**
 * Performs a fetch request with error handling
 * @param url - The URL to fetch
 * @param options - The options for the fetch request
 * @returns A Promise that resolves to the JSON response
 * @throws Will throw an error if the response is not ok or if there's a network error
 */
const fetchWithErrorHandling = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    alert(error);
    throw error;
  }
};

/**
 * Sends a login request to the server
 * @param email - The user's email
 * @param password - The user's password
 * @returns A Promise that resolves to the login response
 */
export const statusLogin = (email: string, password: string) =>
  fetchWithErrorHandling(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

/**
 * Fetches the user's profile data
 * @param token - The authentication token
 * @returns A Promise that resolves to the user's profile data
 */
export const dataProfile = (token: string) =>
  fetchWithErrorHandling(`${BASE_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

/**
 * Updates the user's profile
 * @param token - The authentication token
 * @param firstName - The user's new first name
 * @param lastName - The user's new last name
 * @returns A Promise that resolves to the updated profile data
 */
export const updateProfile = (token: string, firstName: string, lastName: string) =>
  fetchWithErrorHandling(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });