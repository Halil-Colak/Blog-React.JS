import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json',
    },
});

export default api;