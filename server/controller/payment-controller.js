import paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantKey } from "../index.js";
import { v4 as uuid } from 'uuid';
import https from 'https';
import Product from "../model/product-schema.js";
import Order from "../model/order-schema.js";

export const addPaytmGateway = async (request, response) => {
    try {
        const { items } = request.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return response.status(400).json({ message: 'Cart items are required' });
        }

        // Fetch each product from DB and calculate price server-side
        let totalAmount = 0;
        const resolvedItems = [];

        for (const cartItem of items) {
            const product = await Product.findOne({ id: cartItem.id });
            if (!product) {
                return response.status(400).json({ message: `Product not found: ${cartItem.id}` });
            }
            const qty = Math.max(1, parseInt(cartItem.quantity) || 1);
            totalAmount += product.price.cost * qty;
            resolvedItems.push({
                productId: product.id,
                title: product.title.shortTitle,
                price: product.price.cost,
                quantity: qty,
                size: cartItem.size || 'N/A'
            });
        }

        const orderId = uuid();
        const userId = request.user.id;

        // Save a PENDING order so we have a record even before payment completes
        await Order.create({
            orderId,
            userId,
            items: resolvedItems,
            totalAmount,
            status: 'PENDING'
        });

        const paytmParamsForTxn = {
            ...paytmParams,
            ORDER_ID: orderId,
            CUST_ID: userId,
            TXN_AMOUNT: String(totalAmount.toFixed(2))
        };

        const checksum = await paytmchecksum.generateSignature(paytmParamsForTxn, paytmMerchantKey);

        response.status(200).json({ ...paytmParamsForTxn, CHECKSUMHASH: checksum });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const paytmResponse = (request, response) => {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    if (!request.body || Object.keys(request.body).length === 0) {
        return response.redirect(clientUrl);
    }

    const paytmChecksum = request.body.CHECKSUMHASH;
    if (!paytmChecksum) {
        return response.redirect(clientUrl);
    }

    const bodyWithoutChecksum = { ...request.body };
    delete bodyWithoutChecksum.CHECKSUMHASH;

    const isValid = paytmchecksum.verifySignature(bodyWithoutChecksum, paytmMerchantKey, paytmChecksum);

    if (!isValid) {
        return response.redirect(clientUrl);
    }

    const paytmParamsForStatus = {
        MID: request.body.MID,
        ORDERID: request.body.ORDERID
    };

    paytmchecksum.generateSignature(paytmParamsForStatus, paytmMerchantKey).then(checksum => {
        paytmParamsForStatus.CHECKSUMHASH = checksum;
        const post_data = JSON.stringify(paytmParamsForStatus);

        const options = {
            hostname: 'securegw-stage.paytm.in',
            port: 443,
            path: '/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };

        let res = "";
        const post_req = https.request(options, post_res => {
            post_res.on('data', chunk => { res += chunk; });
            post_res.on('end', async () => {
                const result = JSON.parse(res);
                const status = result.STATUS === 'TXN_SUCCESS' ? 'SUCCESS' : 'FAILED';

                try {
                    await Order.findOneAndUpdate(
                        { orderId: request.body.ORDERID },
                        { status }
                    );
                } catch {
                    // Non-fatal: order status update failure shouldn't block redirect
                }

                response.redirect(clientUrl);
            });
        });

        post_req.write(post_data);
        post_req.end();
    });
};
