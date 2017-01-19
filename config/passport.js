var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
	 	User = require('../model/usersModel'),
		db = require('../config/db');

module.exports = function (passport) {
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = 'secret';
	// opts.issuer = "accounts.examplesoft.com";
	// opts.audience = "yoursite.net";
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	    User.findOne({id: jwt_payload.sub}, function(err, user) {
	        if (err) {
	            return done(err, false);
	        }
	        if (user) {
	            done(null, user);
	        } else {
	            done(null, false);
	        }
	    });
	}));
}