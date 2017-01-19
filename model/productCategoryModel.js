'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productCategorySchema = new Schema({
	_id:String,
	title: String,
	material:String,
	image: String,
	desc:String
});
mongoose.model('productcategory', productCategorySchema);