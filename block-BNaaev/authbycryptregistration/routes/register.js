var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});
router.post('/', function(req, res, next) {
    console.log("highjgfhjgjhdf");
    User.create(req.body, (err, createUser) => {
        console.log(err, createUser);
        if (err) {
            return next(err);
        }
        res.send("Succesfully Registration");
    });
});

module.exports = router;