import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Ensure `id` is correctly set in the request
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
