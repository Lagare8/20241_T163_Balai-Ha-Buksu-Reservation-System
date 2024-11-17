import express from 'express';
import { User, Employee, Admin } from '../models/users/user.js'; // Import models
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, userType: user.constructor.modelName, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let existingUser;
    if (userType === 'User') {
        existingUser = await User.findOne({ email: normalizedEmail });
    } else if (userType === 'Employee') {
        existingUser = await Employee.findOne({ email: normalizedEmail });
    } else if (userType === 'Admin') {
        existingUser = await Admin.findOne({ email: normalizedEmail });
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (userType === 'User') {
        newUser = new User({ username, email: normalizedEmail, password: hashedPassword });
    } else if (userType === 'Employee') {
        newUser = new Employee({ username, email: normalizedEmail, password: hashedPassword });
    } else if (userType === 'Admin') {
        newUser = new Admin({ username, email: normalizedEmail, password: hashedPassword });
    }

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ message: 'Signup successful', token, userType: newUser.constructor.modelName });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail })
        || await Employee.findOne({ email: normalizedEmail })
        || await Admin.findOne({ email: normalizedEmail });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login successful', token, userType: user.constructor.modelName });
});

export default router;
