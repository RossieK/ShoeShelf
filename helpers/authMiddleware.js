const { cookie_name, secret } = require('../config/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = function() {
    return async(req, res, next) => {
        try {
            let token = req.cookies[cookie_name];

            if (token) {
                jwt.verify(token, secret, async function(err, decoded) {
                    if (err) {
                        res.clearCookie(cookie_name);
                        next();
                    } else {
                        req.user = decoded;
                        res.locals.isAuthenticated = true;
                        let user = await userService.getOne(decoded._id);
                        res.locals.email = user.email;

                        next();
                    }
                });
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}