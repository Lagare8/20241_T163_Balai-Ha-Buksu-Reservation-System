import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Authorization Header:', req.header('Authorization')); // Log the Authorization header
    console.log('Extracted Token:', token);

    console.log('Token from localStorage:', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); 
        req.userId = decoded.id;
        console.log('Authenticated UserId:', req.userId);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};



export default authenticate;
