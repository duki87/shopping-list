const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
    },
    sessions: [
        {
            token: {
                type: String,
                required: true
            },
            expiresAt: {
                type: Number,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    //return sessions
    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        //Create JSON web token and return it
        jwt.sign({ _id: user._id.toHexString() }, SECRET_JWT_KEY, { expiresIn: 900 }, (err, token) => {
            if(err) {
                reject();
            } else {
                resolve(token);
            }
        })
    });
}

UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise((resolve, reject) => {
        //Generate 64bytes hex string
        crypto.randomBytes(64, (err, random) => {
            if(err) {
                reject();
            } else {
                let token = random.toString('hex');
                return resolve(token);
            }
        })
    });
}

UserSchema.methods.createSessions() = function() {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionsToDB(user, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch(err => { return Promise.reject('Failed to save session to DB. Err: '+err) });
}

let generateRefreshAuthTokenExpiryTime = function() {
    let daysUntilExpire = '10';
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

let saveSessionsToDB = (user, refreshToken) => {
    //Save session to DB
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshAuthTokenExpiryTime();
        user.sessions.push({ 'token': refreshToken, expiresAt });
        user.save().then(() => {
            return resolve(refreshToken);
        }).catch(err => reject(err));
    });
}


//Model Methods
UserSchema.statics.findByIdAndToken = function(_id, token) {
    const User = this;
    return User.findOne({ _id: _id, 'sessions.token': token });
}

UserSchema.statics.findByCredentials = function(email, password) {
    const User = this;
    return User.findOne({ email: email }).then((user) => {

    }).catch(err => {
        if(!user) return Promise.reject();
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, pass) => {
                if(pass) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        })
    });
}

UserSchema.statics.hasRefreshTokenExpire = function(expiresAt) {
    let secondsSinceEpoch = Date.now() / 1000;
    if(expiresAt > secondsSinceEpoch) {
        //Hasn't Expired
        return false;
    } else {
        //Expired
        return true;
    }
}

//Middleware
UserSchema.pre('save', function(next) {
    let user = this;
    let cost = 10;
    if(user.isModified('password')) {
        //If password has been edited
        bcrypt.genSalt(cost, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('User', UserSchema, 'users');