import express from 'express';
import { User, Employee, Admin } from '../models/users/user.js'; // Import models
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, userType: user.constructor.modelName },
        'your_jwt_secret', // Change this to a secure secret
        { expiresIn: '1h' }
    );
};

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, userType } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !userType) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if the user already exists in the relevant collection
    let existingUser;
    if (userType === 'User') {
        existingUser = await User.findOne({ email });
    } else if (userType === 'Employee') {
        existingUser = await Employee.findOne({ email });
    } else if (userType === 'Admin') {
        existingUser = await Admin.findOne({ email });
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    // Create a new user based on the userType
    let newUser;
    if (userType === 'User') {
        newUser = new User({ username, email, password });
    } else if (userType === 'Employee') {
        newUser = new Employee({ username, email, password, role: 'Staff' }); // Default to "Staff" role
    } else if (userType === 'Admin') {
        newUser = new Admin({ username, email, password, permissions: ['manage_users', 'view_reports'] });
    }

    // Save the new user to the appropriate collection
    try {
        await newUser.save();
        res.status(201).json({
            message: `${userType} created successfully!`,
            userType,
            token: generateToken(newUser)  // Send JWT token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error while creating user!' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log('Login route hit'); 
    console.log('Request body:', req.body); // Log the entire request body

    const { email, password } = req.body;

    console.log('Login attempt with email:', email); // Log the email you're attempting to login with
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required!' });
    }

    // Normalize email (trim spaces, lower case) for comparison
    const normalizedEmail = email.trim().toLowerCase();  // Use email here instead of username

    let user;
    try {
        // Search for user by email in the User collection
        user = await User.findOne({ email: normalizedEmail });
        
        if (!user) {
            // If not found, check Employee collection
            user = await Employee.findOne({ email: normalizedEmail });
        }

        if (!user) {
            // If still not found, check Admin collection
            user = await Admin.findOne({ email: normalizedEmail });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        console.log('User found:', user);

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Successfully logged in, return a token
        res.status(200).json({
            message: 'Login successful!',
            userType: user.constructor.modelName, // User type (User, Employee, Admin)
            token: generateToken(user)
        });
    } catch (error) {
        console.log('Error while searching for user:', error);
        return res.status(500).json({ message: 'Error while searching for user!' });
    }
});

export default router;