const express = require('express');

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not allowed to access these!!' });
        }

        next();
    };
}

module.exports = authorizeRole;