const API_URL = 'https://dummyjson.com/auth';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Usuario o contraseña incorrectos');
    }

    return data; // id, username, email, firstName, lastName, gender, image, accessToken, etc.
  } catch (error) {
    throw error;
  }
};