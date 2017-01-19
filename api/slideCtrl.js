// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Slide = mongoose.models.slider,
    api = {};

// ALL
api.getAllSlide = function (req, res) {
    Slide.find(function (err, element) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(element);
        }
    });
};


// POST
api.postSlide = function (req, res) {
    if(!req.body.title || !req.body.status || !req.body.imageDesk){
       return res.status(500).json({ message: 'Improper Data' });
    }

    var slide = new Product(req.body);
    slide.save(function (err) {
        if (!err) {
            return res.status(201).json(slide.toObject());
        } else {
            return res.status(500).json(err);
        }
    });
};

// PUT
api.updateSlide = function (req, res) {
    var id = req.params.id;
    console.log(req.body);
    Slide.findById(id, function (err, element) {
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
api.deleteSlide = function (req, res) {
    var id = req.params.id;
    Slide.findById(id, function (err, element) {
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


router.get('/allslide', api.getAllSlide);
router.post('/slide', api.postSlide);
router.put('/slide', api.updateSlide);
router.delete('/slide', api.deleteSlide);

module.exports = router;