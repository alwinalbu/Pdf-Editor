const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


exports.authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    console.log(token,"token inside here");
    

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};


