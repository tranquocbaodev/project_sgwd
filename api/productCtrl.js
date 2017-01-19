// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Product = mongoose.models.Products,
    api = {};

// ALL
api.getAllProduct = function (req, res) {
    console.log("get All Prodcut");
    Product.find(function (err, element) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log("succenss" + element);
            res.status(200).json(element);
        }
    });
};

// GET
api.getProduct = function (req, res) {
    var id = req.query.id;
    Product.findOne({'_id': id}, function (err, element) {
        if (err) {
            res.status(404).json({ message: 'ActionTrial not found' });
            res.send(req.query);
        } else {
            res.status(200).json(element);
        }
    });
};

// POST
api.postProduct = function (req, res) {
    if(!req.body.title || !req.body.status || !req.body.imageDesk){
       return res.status(500).json({ message: 'Improper Data' });
    }

    var product = new Product(req.body);
    product.save(function (err) {
        if (!err) {
            return res.status(201).json(product.toObject());
        } else {
            return res.status(500).json(err);
        }
    });
};

// PUT
api.updateProduct = function (req, res) {
    var id = req.params.id;
    console.log(req.body);
    Product.findById(id, function (err, element) {
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
            return res.status(404).json({ message: 'ActionTrial not found' });
        }
    });
};

// DELETE
api.deleteProduct = function (req, res) {
    var id = req.params.id;
    Product.findById(id, function (err, element) {
        if(element){
            return element.remove(function (err) {
                if (!err) {
                    return res.status(204).send();
                } else {
                    return res.status(500).json(err);
                }
            });
        }else{
            return res.status(500).json({ message: 'ActionTrial not found' });
        }
    });
};


router.get('/allproduct', api.getAllProduct);
router.get('/product', api.getProduct);
router.post('/product', api.postProduct);
router.delete('/product', api.deleteProduct);

module.exports = router;