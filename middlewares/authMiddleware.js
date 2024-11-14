import session from 'express-session';
import passport from 'passport';
/// middlewares/authMiddleware.js

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Access denied.');
};

export const isUser = (req, res, next) => {
    if (req.user) {
        return next(); // Cho phép nếu đã đăng nhập
    }
    return res.status(401).send('Unauthorized.'); // Từ chối nếu chưa đăng nhập
};

export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Nếu chưa đăng nhập, chuyển hướng về trang login
};