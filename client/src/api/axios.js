import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:7777",
    withCredentials: true
})

// withCredentials: true is required because your 
// JWT is stored in an HTTP-only cookie.

export default api;