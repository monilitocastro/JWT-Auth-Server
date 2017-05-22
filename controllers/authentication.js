const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = function(user){
    const issued = new Date().getTime();

    return jwt.encode({sub: user.id, iat: issued}, config.secret);
}

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    if( !email || !password ){
        res.status(422).send({error: 'You must request with an email and password'})
    }

    // see if user with given email exists
    User.findOne({ email: email }, function(err, existingUser){
        if(err) { return next(err); }

    // if user with email exists return error
        if(existingUser){
            return res.status(422).send({error: 'Email is in use'});
        }

    // if userwith email DNE create and save user
    const user = new User({
        email: email,
        password: password
    });

    user.save(function(err){
        if(err) { return next(err);}

    // response to request indicating the user was created
        res.json({token: tokenForUser(user)});
    });

    });

}