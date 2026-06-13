import * as actionType from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART: {
            const item = action.payload;
            const existing = state.cartItems.find(p => p.cartKey === item.cartKey);

            if (existing) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(p => p.cartKey === item.cartKey ? item : p)
                };
            }
            return { ...state, cartItems: [...state.cartItems, item] };
        }

        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(p => p.cartKey !== action.payload)
            };

        case actionType.CART_RESET:
            return { cartItems: [] };

        default:
            return state;
    }
};
