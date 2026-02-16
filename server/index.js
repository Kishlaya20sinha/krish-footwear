import express from "express";
import connection from "./database/db.js";
import dotenv from "dotenv";
import DefaultData from "./default.js";
import Router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuid } from 'uuid'; // Unique Order ID banane ke liye uuid zaroori hai.

const app = express();
dotenv.config(); 

app.use(cors()); 
app.use(bodyParser.json({ extended: true })); 
// Ye line sabse upar honi chahiye routes se pehle taaki callback data read ho sake.
app.use(bodyParser.urlencoded({ extended: true })); 

// Pehle middleware, fir routes.
app.use("/", Router);

const PORT = 8000; 
const USERNAME = process.env.DB_USERNAME; 
const PASSWORD = process.env.DB_PASSWORD; 

const startServer = async () => {
    try {
        await connection(USERNAME, PASSWORD); 
        await DefaultData(); 
        app.listen(PORT, () => {
            console.log(`✅ Server is running successfully on port ${PORT}`);
        });
    } catch (error) {
        console.log("❌ Error during server startup:", error.message);
    }
};

startServer();

// Paytm Settings
export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams.MID = process.env.PAYTM_MID;
paytmParams.WEBSITE = process.env.PAYTM_WEBSITE;
paytmParams.CHANNEL_ID = process.env.PAYTM_CHANNEL_ID;
paytmParams.INDUSTRY_TYPE_ID = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams.CALLBACK_URL = "http://localhost:8000/callback";