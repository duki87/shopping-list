const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.getUsers = async (req, res, next) => {
    try {
        const items = await User.find({ _listId: req.params.listId });
        return res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

exports.createUser = function(req, res, next) {
    let newUser = new User(req.body);
    newUser.save().then(() => {
        return newUser.createSession().then((refreshToken) => {
            //If session created successfully, then refresh token is returned.
            //Next - generate access token for user
            return newUser.generateAccessAuthToken().then((accessToken) => {
                //If token is generated successfully, return object with tokens
                return { accessToken, refreshToken }
            }).then((authTokens) => {
                //Send response with tokens
                res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .status(201).send(newUser);
            })
        })
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.loginUser = function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user
            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens 
                return { accessToken, refreshToken }               
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .status(200).send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
}

