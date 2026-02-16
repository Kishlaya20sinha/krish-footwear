import express from "express";
import { userSignup, userLogin } from "../controller/user-controller.js"; // Import both signup and login logic
import { getProducts, getProductDetails } from "../controller/product-controller.js";
import { addPaytmGateway, paytmResponse } from "../controller/payment-controller.js";
const router = express.Router();

// Route for User Registration
router.post("/signup", userSignup); 

// ADDED: Route for User Authentication (Login)
// This will map the URL 'http://localhost:8000/login' to the userLogin function
router.post("/login", userLogin); 

router.get('/products', getProducts);  

router.get('/product/:id', getProductDetails); 

router.post('/payment', addPaytmGateway);
router.post('/callback', paytmResponse);

export default router;