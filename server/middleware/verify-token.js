const User = require('../models/user.model');

exports.verifyRefreshToken = function(req, res, next) {
    //extract refresh token from the request header
    let refreshToken = req.header('x-refresh-token');
    //extract _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if(!user) {
            return Promise.reject('USER_NOT_FOUND');
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionValid = false;
        user.sessions.forEach((session) => {
            if(session.token == refreshToken) {
                //If refresh token is found in session array,
                //then check if the session expired
                if(User.hasRefreshTokenExpire(session.expiresAt) === false) {
                    //if session has not expired
                    isSessionValid = true;
                }
            }
        });
        if(isSessionValid) {
            //session is valid - calling next() to continue processing the request
            next();
        } else {
            //if session is not valid
            return Promise.reject('REFRESH_TOKEN_EXPIRED');
        }
    }).catch((err) => res.status(401).send(err));
}