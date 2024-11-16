import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log('Authorization header:', req.headers.authorization);
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        console.log("Token received:", token); // Log the received token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log the decoded token
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error("Error verifying token:", err); // Log the error
        res.status(401).json({ message: "Token is not valid" });
    }
};



export default authMiddleware;