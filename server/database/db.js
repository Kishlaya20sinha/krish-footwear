import mongoose from 'mongoose';

const Connection = async (username, password) => {
    // Connection string setup
    const URL = `mongodb+srv://${username}:${password}@krishfootwear.wzcnrmg.mongodb.net/KrishFootwear?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL); // Database se connect hone ka intezaar karein
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default Connection;