import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user info to the request object
        req.user = decoded;
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
/*
Use this middleware in any route that needs to be protected.

import authMiddleware from './middleware/authMiddleware.js';

// Protected route example
app.get('/user/dashboard', authMiddleware, (req, res) => {
    res.send('This is the User Dashboard');
});
*/

export default authMiddleware;
