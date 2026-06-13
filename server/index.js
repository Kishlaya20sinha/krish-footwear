import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connection from "./database/db.js";
import DefaultData from "./default.js";
import Router from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts, please try again after 15 minutes' }
});

app.use("/", Router);

const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const startServer = async () => {
    try {
        await connection(USERNAME, PASSWORD);
        await DefaultData();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error during server startup:", error.message);
    }
};

startServer();

export const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export const paytmParams = {
    MID: process.env.PAYTM_MID,
    WEBSITE: process.env.PAYTM_WEBSITE,
    CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
    INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
    CALLBACK_URL: `${process.env.SERVER_URL || 'http://localhost:8000'}/callback`
};
