const config = require('../config');
const User = require('../models/user');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {};

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