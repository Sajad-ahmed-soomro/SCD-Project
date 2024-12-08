const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization'); // Assuming JWT is sent in the request header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.adminId; // Store adminId in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
