import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";

const DefaultData = async () => {
    try {
        // Purane saare products ko delete kar rahe hain taaki naya footwear data fresh load ho sake.
        await Product.deleteMany({}); 
        
        // Naya footwear data (jo humne data.js mein update kiya) insert kar rahe hain.
        await Product.insertMany(products);

        console.log("✅ Footwear data imported successfully and old data cleared.");
    } catch (error) {
        console.log("❌ Error while inserting default data:", error.message);
    }
}

export default DefaultData;