import Product from "../model/product-schema.js"; 

// Make sure 'export' is written before 'const'
export const getProducts = async (request, response) => {
    try {
        // Products fetch karne ki koshish.
        const products = await Product.find({}); 
        
        // Agar data mil gaya toh 200 status ke saath bhejein.
        response.status(200).json(products);
    } catch (error) {
        // Backend terminal mein error print karein aur frontend ko 500 bhejein.
        console.log("Error while fetching products:", error.message);
        response.status(500).json({ message: error.message });
    }
}

// Ensure 'export' is here too
export const getProductDetails = async (request, response) => {
    try {
        // Using findOne because 'id' is our custom field (product1, product2, etc.)
        const product = await Product.findOne({ 'id': request.params.id }); 
        
        console.log("Found product in Atlas:", product ? product.id : "Not Found"); 
        response.status(200).json(product);
    } catch (error) {
        console.log("Error while fetching product details:", error.message); 
        response.status(500).json({ message: error.message });
    }
}