import axios from "axios";

const url = 'http://localhost:8000';

export const authenticateSignup = async (data) => {
    try {
        // Signup data ko backend par bhej rahe hain.
        return await axios.post(`${url}/signup`, data);
    } catch (error) {
        console.log('Error while calling signup API', error);
        return error.response; 
    }
}

export const authenticateLogin = async (data) => {
    try {
        // Login details verify kar rahe hain.
        return await axios.post(`${url}/login`, data);
    } catch (error) {
        console.log('Error while calling login API', error);
        return error.response; 
    }
}

// Yahan 'async' add kiya hai aur 'data' parameter pass kiya hai.
export const payUsingPaytm = async (data) => {
    try {
        // Backend se Paytm checksum aur params mangwa rahe hain.
        let response = await axios.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling payment API', error);
        return error.response; 
    }
}