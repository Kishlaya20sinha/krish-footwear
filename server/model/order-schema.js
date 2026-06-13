import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: [
        {
            productId: String,
            title: String,
            price: Number,
            quantity: Number,
            size: String
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
