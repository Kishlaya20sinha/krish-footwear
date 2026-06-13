import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/user-schema.js";

export const userSignup = async (request, response) => {
    try {
        const { firstname, lastname, username, email, password, phone } = request.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return response.status(409).json({ message: "Username already taken" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return response.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstname, lastname, username, email, password: hashedPassword, phone });
        await newUser.save();

        return response.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        if (!user) {
            return response.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return response.status(200).json({
            token,
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};
