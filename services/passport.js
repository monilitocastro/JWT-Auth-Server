const config = require('../config');
const User = require('../models/user');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// set up options for strategy
const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
};


// create login logic
const jwtLogin = new JwtStrategy( jwtOptions, function(payload, done){
    User.findById( payload.sub, function(err, user){
        if(err){
            return done(err, false);
        }

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
});


// tell passport to use jwtLogin
passport.use(jwtLogin);