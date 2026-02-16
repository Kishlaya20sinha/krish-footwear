import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // Connects to the browser extension
import { thunk } from 'redux-thunk'; // FIXED: Using named import for compatibility with v3+
import { cartReducer } from './reducers/cartReducer';
import { getProductReducer, getProductDetailsReducer } from './reducers/productReducer';

// This is the root of your state. 'getProducts' is the key you'll use in useSelector
const reducer = combineReducers({
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

const middleware = [thunk]; // Thunk allows us to handle the async axios calls

const store = createStore(
    reducer,
    // Merges middleware with DevTools so you can track actions in the browser
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;