var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.post('/', function(req, res, next) {
    var { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        res.render('login', { title: 'Login' });
    }
    User.findOne({ email }, (err, users) => {

        if (err) return next(err);
        if (!users) {
            res.render('login', { title: 'Login' });

        }
        users.verifyPassword(password, (err, result) => {
            console.log(err, result);
        })
    })

});


module.exports = router;