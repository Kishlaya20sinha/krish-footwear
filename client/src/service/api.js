import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${url}/signup`, data);
    } catch (error) {
        return error.response;
    }
};

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${url}/login`, data);
    } catch (error) {
        return error.response;
    }
};

export const payUsingPaytm = async (data) => {
    try {
        const response = await axios.post(`${url}/payment`, data, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};
