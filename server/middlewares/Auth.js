const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Extract token from multiple sources
        const token = req.cookies.jobfit_token || 
                     req.header('Authorization')?.replace('Bearer ', '') || 
                     req.header('jobfit_token') ||
                     req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if user still exists
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Token invalid.',
                });
            }

            // Add user info to request object
            req.user = {
                id: decoded.id,
                email: decoded.email,
                user: user
            };
            
            next();
        } catch (jwtError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in authentication.',
        });
    }
};

module.exports = auth;