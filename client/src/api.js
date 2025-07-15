// client/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Backend URL
});

// ✅ Automatically include token in all requests
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`; // ✅ Bearer format
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
