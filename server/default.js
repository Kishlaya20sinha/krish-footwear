import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";

const DefaultData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) return;

        await Product.insertMany(products);
        console.log("Default product data loaded.");
    } catch (error) {
        console.log("Error while inserting default data:", error.message);
    }
};

export default DefaultData;
