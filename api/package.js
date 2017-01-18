// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Package = mongoose.models.Package,
    api = {};

// ALL
api.packageAll = function (req, res) {
    Package.find(function (err, package) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(package);
        }
    });
};

// GET
api.package = function (req, res) {
    var id = req.query.id;
    console.log(req.query);
    Package.findOne({'_id': id}, function (err, package) {
        if (err) {
            res.status(404).json({ message: 'ActionTrial not found' });
            res.send(req.query);
        } else {
            res.status(200).json(package);
        }
    });
};

// // POST
// api.addActionTrial = function (req, res) {
//     //if(!req.body.data || !req.body.name){
//     //    return res.status(500).json({ message: 'Improper Data' });
//     //}

//     var actionTrial = new ActionTrial(req.body);
//     actionTrial.save(function (err) {
//         if (!err) {
//             return res.status(201).json(actionTrial.toObject());
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// };

// // PUT
// api.editActionTrial = function (req, res) {
//     var id = req.params.id;
//     console.log(req.body);
//     ActionTrial.findById(id, function (err, actionTrial) {
//         if(actionTrial){
//             if (!req.body.data || !req.body.title) {
//                 return res.status(500).json({ message: 'Improper Data' });
//             }

//             actionTrial.title = req.body.title;
//             actionTrial.data = req.body.data;

//             return actionTrial.save(function (err) {
//                 if (!err) {
//                     return res.status(200).json(actionTrial.toObject());
//                 } else {
//                     return res.status(500).json(err);
//                 }
//             });
//         }else{
//             return res.status(404).json({ message: 'ActionTrial not found' });
//         }
//     });
// };

// // DELETE
// api.deleteActionTrial = function (req, res) {
//     var id = req.params.id;
//     ActionTrial.findById(id, function (err, actionTrial) {
//         if(actionTrial){
//             return actionTrial.remove(function (err) {
//                 if (!err) {
//                     return res.status(204).send();
//                 } else {
//                     return res.status(500).json(err);
//                 }
//             });
//         }else{
//             return res.status(500).json({ message: 'ActionTrial not found' });
//         }
//     });
// };


router.get('/package-all', api.packageAll);
router.get('/package', api.package);
// router.post('/action-trial', api.addActionTrial);
// router.route('/package')
//         .get(api.package)
//     .put(api.editActionTrial)
//     .delete(api.deleteActionTrial);

module.exports = router;