import axios from "axios";
  
axios.defaults.baseURL = 'https://lobster-app-osqfh.ondigitalocean.app';

export const login = async (email: string, password: string) => {
    return await axios.post('/auth/login', { email, password })
}

export const logout = async () => {
    return await axios.post('/auth/logout')
}

export const register = async (username: string, email: string, password: string) => {
    return await axios.post('/users', { username, email, password })
}

export const getProfile = async (jwt: string) => {
    return await axios.get('/users/profile', { headers: { Authorization: `Bearer ${jwt}` } });
}