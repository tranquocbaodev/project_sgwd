'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var usersSchema = new Schema({
	username: {
					type:String,
					unique: true,
					require:true
					},
	pwd: {
					type:String,
					require:true
				},
	role: String
});

usersSchema.pre('save',function (next) {
	var user = this;
	if (this.isModified('pwd') || this.isNew) {
		bcrypt.genSalt(10, function (err,salt) {
			if(err){
				return next(err);
			}
			bcrypt.hash(user.pwd, salt ,  function (err , hash) {
				if (err) {
					return next(err)
				}
				user.pwd = hash;
				next();
			})
		})
	}else{
		return next();
	}
});

usersSchema.methods.comparePassword = function (pwd, cb) {
	bcrypt.compare(pwd, this.pwd ,function (err,isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	})
}

module.export = mongoose.model('Users', usersSchema);