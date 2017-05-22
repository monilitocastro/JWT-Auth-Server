const User = require('../models/user');

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    // see if user with given email exists
    User.findOne({ email: email }, function(err, existingUser){
        if(err) return next(err);

    // if user with email exists return error
        if(existingUser){
            return res.status(422);
        }

    // if userwith email DNE create and save user
    const user = new User({
        email: email,
        password: password
    });

    user.save(function(err){
        if(err) { return next(err);}

    // response to request indicating the user was created
        res.json(user)
    });

    });

}