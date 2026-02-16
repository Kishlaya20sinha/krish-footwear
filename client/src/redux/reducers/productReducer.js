import * as actionTypes from '../constants/productConstant';

// state is initialized with an empty products array to prevent .map errors
export const getProductReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_REQUEST:
            return { loading: true, products: [] }; // Set loading to true while fetching
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload }; // Update state with backend data
        case actionTypes.GET_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }; // Store error message if API fails
        default:
            return state;
    }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }; // Set loading to true while fetching
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }; // Update state with backend data
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }; // Store error message if API fails
        default:
            return state;
    }
};
