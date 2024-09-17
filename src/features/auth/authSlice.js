import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};
