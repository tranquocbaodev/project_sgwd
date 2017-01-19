'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productCategorySchema = new Schema({
	_id:Number,
	title: {
		type: String
	},
	image: String
});
mongoose.model('productCategory', productCategorySchema);