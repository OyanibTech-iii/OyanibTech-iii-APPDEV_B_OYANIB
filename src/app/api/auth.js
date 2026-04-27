
const BASE_URL = 'http://127.0.0.1:8000/api';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ email, password }) {
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log('Login Response:', data);
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
 
}

export const getProducts = async (token) => {
    const response = await fetch(BASE_URL + '/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    });
    if (!response.ok) {
      console.log('Error fetching products:', response);
      throw new Error('JWT Token not found or invalid')};
    return await response.json();
};