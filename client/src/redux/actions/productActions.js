import axios from 'axios';
import * as actionTypes from '../constants/productConstant';

const URL = 'http://localhost:8000'; // Make sure your backend server is running on this port

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

        const { data } = await axios.get(`${URL}/products`);
        
        // Check your Browser Console (F12) -> Console tab for this message:
        console.log('Action Data Received:', data);

        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        console.log('Error while calling getProducts API:', error.message);
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`${URL}/product/${id}`);
        
        // Check your Browser Console (F12) -> Console tab for this message:
        console.log('Action Data Received:', data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        console.log('Error while calling getProductDetails API:', error.message);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};
