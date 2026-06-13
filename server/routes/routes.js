import express from "express";
import { userSignup, userLogin } from "../controller/user-controller.js";
import { getProducts, getProductDetails } from "../controller/product-controller.js";
import { addPaytmGateway, paytmResponse } from "../controller/payment-controller.js";
import authenticate from "../middleware/auth.js";
import { loginLimiter } from "../index.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", loginLimiter, userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductDetails);

router.post('/payment', authenticate, addPaytmGateway);
router.post('/callback', paytmResponse);

export default router;
