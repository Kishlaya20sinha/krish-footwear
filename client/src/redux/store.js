import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { getProductReducer, getProductDetailsReducer } from './reducers/productReducer';

const reducer = combineReducers({
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

const middleware = [thunk];

const savedCartItems = (() => {
    try {
        const raw = localStorage.getItem('cartItems');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
})();

const store = createStore(
    reducer,
    { cart: { cartItems: savedCartItems } },
    composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
    const { cartItems } = store.getState().cart;
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch {
        // Ignore storage errors (e.g. private browsing quota)
    }
});

export default store;
