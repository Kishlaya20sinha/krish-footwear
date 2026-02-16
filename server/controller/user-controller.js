import User from "../model/user-schema.js"; // Importing the User model

export const userSignup = async (request, response) => { 
    try {
        // Log to see if data is actually arriving at the controller
        console.log("Data received at controller:", request.body); 

        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ message: "User already exists" });
        }

        const user = request.body; 
        const newUser = new User(user); 
        await newUser.save(); // This line triggers the MongoDB Atlas insertion

        // Explicitly return JSON so the frontend knows to proceed
        return response.status(200).json({ message: "User created successfully", data: user });
    } catch (error) {
        console.log("Error while calling userSignup API", error.message);
        return response.status(500).json({ message: error.message });
    }
}

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;

        // Using .lean() or just standard findOne to fetch the document
        let user = await User.findOne({ username: username, password: password });

        if (user) {
            // Send back the user data including the firstname
            return response.status(200).json({ data: user });
        } else {
            return response.status(401).json({ message: 'Invalid login' });
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}