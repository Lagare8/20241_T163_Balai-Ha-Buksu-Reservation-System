import express from 'express';
import { User, Employee, Admin } from '../models/users/user.js'; // Import models
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';

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
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long!' });
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
    
    console.log('Password before hashing:', password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    let newUser;
    if (userType === 'User') {
        newUser = new User({ username, email: normalizedEmail, password: password });
    } else if (userType === 'Employee') {
        newUser = new Employee({ username, email: normalizedEmail, password: password });
    } else if (userType === 'Admin') {
        newUser = new Admin({ username, email: normalizedEmail, password: password });
    }

    await newUser.save();
    const savedUser = await User.findById(newUser._id);
    console.log('Saved password in DB:', savedUser.password);

    const token = generateToken(newUser);
    console.log('Final user object before saving:', newUser);
    res.status(201).json({ message: 'Signup successful', token, userType: newUser.constructor.modelName });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Password from client:', `${password}`);
    console.log('Password length:', password.length);

    const user = await User.findOne({ email: email.trim().toLowerCase() })
        || await Employee.findOne({ email: email.trim().toLowerCase() })
        || await Admin.findOne({ email: email.trim().toLowerCase() });
        console.log('Retrieved user:', user);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    console.log('Stored hashed password:', user.password);

    try {
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        console.log('Login successful. Token:', token);

        res.json({ message: 'Login successful', token, userId: user._id, userType: user.constructor.modelName });
    } catch (error) {
        console.error('Error during bcrypt.compare:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/forgotPassword', async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message: 'Email is required'});
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user;
    
    user = await User.findOne({email: normalizedEmail})
        || await Employee.findOne({email: normalizedEmail})
        || await Admin.findOne({email: normalizedEmail});
    
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h'},
    );

    const resetURL = `http://localhost:5000/api/auth/resetPassword/${resetToken}`;

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Required',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
            <h2 style="color: #000;">Password Reset</h2>
            <p style="font-size: 16px; margin: 20px 0;">Click the link below to reset your password:</p>
            <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        `,
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: 'Password reset link sent! Please check your email.',
        })
    }catch(error){
        console.error('Error sending email', error);
        res.status(500).json({message: 'Error sending reset email. Please try again later.'})
    }
});

router.post('/resetPassword/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New Password is required' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long!' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const user = await User.findOne({ _id: decoded.userId })
            || await Employee.findOne({ _id: decoded.userId })
            || await Admin.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Hash the new password
        user.password = newPassword;
        
        await user.save();

        // Generate a new JWT token after password change
        const newToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Set the desired expiration time
        );

        // Send the new token in the response
        res.status(200).json({
            message: 'Password has been successfully reset',
            token: newToken,  // Include the new token
        });
    } catch (error) {
        console.error('Error resetting password: ', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
        }

        res.status(400).json({ message: 'Invalid or expired token' });
    }
});


router.get('/resetPassword/:token', (req, res) => {
    const { token } = req.params;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5" style="max-width: 400px;">
                <h2 class="text-center mb-4">Reset Your Password</h2>
                <form action="/api/auth/resetPassword/${token}" method="POST">
                    <div class="mb-3">
                        <label for="password" class="form-label">New Password</label>
                        <input type="password" name="newPassword" id="password" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Reset Password</button>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});


export default router;
