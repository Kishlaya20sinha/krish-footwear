import axios from "axios";
import * as actionType from "../constants/cartConstant";

const URL = 'http://localhost:8000';

//Yahan 'size' parameter add kiya hai taaki user ka chuna hua shoe size cart mein save ho sake.
export const addToCart = (id, quantity, size) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/product/${id}`);
        
        dispatch({ 
            type: actionType.ADD_TO_CART, 
            // Human language: Payload mein 'size' ko add kar diya hai.
            payload: { ...data, quantity, size } 
        });
        
    } catch (error) {
        dispatch({ 
            type: actionType.ADD_TO_CART_ERROR, 
            payload: error.message 
        });
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ 
        type: actionType.REMOVE_FROM_CART, 
        payload: id 
    });
}