'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productsSchema = new Schema({
	_id: String,
	title: String,
	status: String,
	favorite: Boolean,
	imageDesk: String,
	codeId:String,
	brand:String,
	manufacturer:String,
	color: String,
	date:String,
	func:{
		type: Array,
    default: []
	},
	warranty: {
		type: Array,
    default: []
	},
	materialType:String,
	category:String
});
mongoose.model('Products', productsSchema);