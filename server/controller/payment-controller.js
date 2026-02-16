import paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantKey } from "../index.js";
import { v4 as uuid } from 'uuid'; // Har transaction ke liye unique ID generate karne ke liye.
import https from 'https';

export const addPaytmGateway = async (request, response) => {
    try {
        // Base params ko copy karke har request ke liye unique data generate kar rahe hain.
        let paytmParamsWithUniqueId = {
            ...paytmParams,
            ORDER_ID: uuid(), // Unique Order ID. Iske bina redirection fail hoga.
            CUST_ID: `cust_${Date.now()}`, // Dynamic customer id.
            TXN_AMOUNT: String(request.body.amount || '100') // Frontend se aaya real price.
        };

        // Naye dynamic params ka checksum generate kar rahe hain.
        let checksum = await paytmchecksum.generateSignature(paytmParamsWithUniqueId, paytmMerchantKey);
        
        let params = {
            ...paytmParamsWithUniqueId,
            "CHECKSUMHASH": checksum
        };

        // Ab ye params frontend ke post() function ko milenge.
        response.status(200).json(params); 
    } catch (error) {
        console.log("Error in addPaytmGateway:", error);
        response.status(500).json({ message: error.message });
    }
}

export const paytmResponse = (request, response) => {
    // Check karein ki Paytm ne data bheja hai ya nahi.
    if (!request.body || Object.keys(request.body).length === 0) {
        console.log("❌ No response body received from Paytm");
        return response.redirect(`http://localhost:3000/`);
    }

    const paytmChecksum = request.body.CHECKSUMHASH;
    
    // Agar checksum missing hai toh decrypt function crash ho jayega.
    if (!paytmChecksum) {
        console.log("❌ Checksum missing in response - Redirection might have failed.");
        return response.redirect(`http://localhost:3000/`);
    }

    delete request.body.CHECKSUMHASH;

    // Verify signature to ensure data is from Paytm.
    let isVerifySignature = paytmchecksum.verifySignature(request.body, paytmMerchantKey, paytmChecksum);
    
    if (isVerifySignature) {
        // Status check API logic starts.
        let paytmParamsForStatus = {};
        paytmParamsForStatus["MID"] = request.body.MID;
        paytmParamsForStatus["ORDERID"] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParamsForStatus, paytmMerchantKey).then(function (checksum) {
            paytmParamsForStatus["CHECKSUMHASH"] = checksum;
            const post_data = JSON.stringify(paytmParamsForStatus);

            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log("✅ Final Transaction Status:", result.STATUS);
                    // Redirecting back to React frontend.
                    response.redirect(`http://localhost:3000/`);
                });
            });

            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("❌ Checksum Mismatched");
        response.redirect(`http://localhost:3000/`);
    }
}