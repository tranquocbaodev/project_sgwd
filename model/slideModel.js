'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var slideSchema = new Schema({
	_id:String,
	title: {
		type:String
	},
	desc:String,
	image: String
});
mongoose.model('slider', slideSchema);