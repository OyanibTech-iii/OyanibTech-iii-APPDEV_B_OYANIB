
export async function login({email, password}) {
    const BASE_URL = ''; 
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    };
    const response = await fetch(`${BASE_URL}/login`, options);
    const data = await response.json();
    console.log('Login response:', data);
}