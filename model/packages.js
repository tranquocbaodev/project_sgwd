'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var packageSchema = new Schema({
	_id:Number,
	title: {
		type: String
	},
	price: Number,
	level: Number,
	image: String,
	labels: {
		type: Array,
    default: []
	}
});
mongoose.model('Package', packageSchema);