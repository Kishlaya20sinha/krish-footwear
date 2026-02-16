import * as actionType from "../constants/cartConstant";

// Initial state hamesha ek object { cartItems: [] } honi chahiye.
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload;
            
            //Database ki 'id' aur payload ki 'id' match kar rahe hain.
            const exist = state.cartItems.find(product => product.id === item.id);

            if (exist) {
                return {
                    ...state,
                    //Agar shoe pehle se cart mein hai, toh use update kar do (e.g., naya size ya quantity).
                    cartItems: state.cartItems.map(data => data.id === exist.id ? item : data)
                }
            } else {
                //Agar naya shoe hai, toh use array mein add kar do.
                return { ...state, cartItems: [...state.cartItems, item] }
            }

        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                //Di gayi ID ko filter karke cart se nikal rahe hain.
                cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
        
        case actionType.CART_RESET:
            return { cartItems: [] };

        default:
            return state;
    } // Switch yahan band hona chahiye.
};