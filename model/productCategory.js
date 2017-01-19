'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productCategorySchema = new Schema({
	_id:String,
	title: {
		type: String
	},
	image: String
});
mongoose.model('ProductCategory', productCategorySchema);