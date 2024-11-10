import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log('Authorization header:', req.headers.authorization);
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Set userId to be used in subsequent requests
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token is not valid" });
    }
};


export default authMiddleware;
