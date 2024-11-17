const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            req.userRole = decoded.role; // Add role to the request object
            
            if (allowedRoles && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (err) {
            console.error("Error verifying token:", err); // Log the error
            res.status(401).json({ message: "Token is not valid" });
        }
    };
};

export default authMiddleware;