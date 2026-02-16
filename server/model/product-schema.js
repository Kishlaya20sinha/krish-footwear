import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique product ID from data.js
    url: String, // Thumbnail image URL
    detailUrl: String, // Large image URL for detail page
    title: Object, // Contains shortTitle and longTitle
    price: Object, // Contains mrp, cost, and discount
    quantity: Number,
    description: String,
    discount: String, // Display discount string like "Extra 10% Off"
    tagline: String
},{ 
    // Ye line buffering ko band karegi taaki frontend "Loading..." mein na fasa rahe.
    bufferCommands: false 
});

// The third parameter "products" ensures it matches your Atlas collection name exactly
const Product = mongoose.model("Product", productSchema, "products"); 

export default Product;