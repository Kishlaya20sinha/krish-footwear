import axios from "axios";
import * as actionType from "../constants/cartConstant";

const URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

export const addToCart = (id, quantity, size) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/product/${id}`);
        const cartKey = `${id}_${size}`;

        dispatch({
            type: actionType.ADD_TO_CART,
            payload: { ...data, quantity, size, cartKey }
        });
    } catch (error) {
        dispatch({
            type: actionType.ADD_TO_CART_ERROR,
            payload: error.message
        });
    }
};

export const removeFromCart = (cartKey) => (dispatch) => {
    dispatch({
        type: actionType.REMOVE_FROM_CART,
        payload: cartKey
    });
};
