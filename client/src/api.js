import axios from 'axios';

// ✅ Use Vite environment variable for backend URL
const API = axios.create({
  baseURL: 'https://g27-fsd-notesapp-neha.onrender.com/api',
});

// ✅ Include token in all requests
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
