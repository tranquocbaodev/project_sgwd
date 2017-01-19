// Module dependencies.
var express = require('express'),
		router = express.Router(),
		mongoose = require('mongoose'),
		ProductCategory = mongoose.models.productcategory,
		api = {};

// ALL
api.getAllProductCategory = function (req, res) {
  ProductCategory.find(function (err, element) {
      if (err) {
          res.status(500).json(err);
      } else {
          res.status(200).json(element);
      }
  });
};

// PUT
api.updateProductCategory = function (req, res) {
	var id = req.params.id;
	ProductCategory.findById(id, function (err, element) {
		if(element){
				if (!req.body.data || !req.body.title) {
						return res.status(500).json({ message: 'Improper Data' });
				}
				element.title = req.body.title;
				element.data = req.body.data;

				return element.save(function (err) {
						if (!err) {
								return res.status(200).json(element.toObject());
						} else {
								return res.status(500).json(err);
						}
				});
		}else{
				return res.status(404).json({ message: 'Category not found' });
		}
	});
};

router.get('/productcategory', api.getAllProductCategory);
router.post('/productcategory', api.updateProductCategory);
module.exports = router;