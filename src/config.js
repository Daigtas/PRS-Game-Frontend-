const isDevelopment = process.env.NODE_ENV !== 'production';

const API_URL = isDevelopment ? 'http://localhost:5000' : 'https://api.sandboxas.lt';

export const getApiHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export default API_URL;
