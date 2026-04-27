
const BASE_URL = 'http://127.0.0.1:8000/api';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ email, password }: { email: string; password: string }) {
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  // console.log('Login Response:', data);
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }

}
export async function userRegister({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }) {
  const response = await fetch(BASE_URL + '/register', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Registration failed');
  }
}

export const getProducts = async (token: string) => {
  const response = await fetch(BASE_URL + '/products', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetching products:', response);
    throw new Error('JWT Token not found or invalid')
  };
  return await response.json();
};

export const getStocks = async (token: string) => {
  const response = await fetch(`${BASE_URL}/stocks`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch stocks');
  }
  return await response.json();
};

export const getUsers = async (token: string) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch users');
  }
  return await response.json();
};