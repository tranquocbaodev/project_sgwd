// Module dependencies.
var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	jwt = require('jwt-simple'),
	Users = mongoose.models.Users,
	help = require('../config/help'),
	api = {};

// Login
api.login = function (req, res) {
	console.log(req.authorization);
	Users.findOne({
		username : req.body.username
	}, function (err, user) {
		if (err) throw err;
		if (!user) {
			return res.status(403).send({succes: false, msg: 'Authentication failed'});
		}else{
			console.log(user);
			user.comparePassword(req.body.pwd , function (err, isMatch) {
				if (isMatch && !err) {
					var token = jwt.encode(user,help.secret);
					res.json({succes:true, token: "JWT " +token});
				}else{
					return res.status(403).send({succes: false, msg: 'password do not Match!'});
				}
			});
		}
	});
	
};

// Register
api.register = function (req, res) {
	console.log(req.body.username);
	console.log(req.body.pwd);
	console.log(req.body.role);
	if (!req.body.username || !req.body.pwd) {
		res.json({succes: false, msg:'Login Error!'});
	}else{
		var newUsers = new Users({
			username : req.body.username,
			pwd : req.body.pwd,
			role : req.body.role
		})
		console.log(newUsers);
		newUsers.save(function (err) {
			if (err) {
				res.json({succes:false , msg:"Username already exists."});
			}else{
				res.json({succes:true , msg:"Username created user!"});
			}
		});
	}
};

//member Info
api.memberInfo = function (req,res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, help.secret);
		console.log(decoded.exp);
		console.log(decoded.iss);
		Users.findOne({
			username : decoded.username
		}, function (err, user) {
			res.json({succes:true , msg:user});
			if (err) throw err;
			if (!user) {

			}else{

			}
		})
	}
}

getToken = function (headers) {
	if (headers && headers.token) {
		var parted = headers.token.split(" ");
		if (parted.length === 2) {
			return parted[1]
		}else{
			return null;
		}
	}else{
		return null;
	}
}

router.post('/login', api.login);
router.post('/register', api.register);
router.get('/memberinfo', api.memberInfo);

module.exports = router;