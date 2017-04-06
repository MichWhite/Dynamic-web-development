var Special = require('../models/specials');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://admin:admin@ds117909.mlab.com:17909/pizzaorder');


var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the Special model to find all specials
    Special.find(function(err, specials) {
        if (err)
            res.send(err);
        else
            res.json(specials);
    });
}

router.findOne = function(req, res) {

    // Use the Special model to find a single special
    Special.find({ "_id" : req.params.id },function(err, special) {
        if (err)
            res.json({ message: 'Special NOT Found!', errmsg : err } );
        else
            res.json(special);
    });
}

router.addSpecial = function(req, res) {

    var special = new Special();

    special.name = req.body.name;
    special.price = req.body.price;
    special.quantity = req.body.quantity;

    console.log('Adding special: ' + JSON.stringify(special));

    // Save the special and check for errors
    special.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Special Added!', data: special });
    });
}

router.deleteSpecial = function(req, res) {

    Special.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Special Deleted!'});
    });
}


module.exports = router;