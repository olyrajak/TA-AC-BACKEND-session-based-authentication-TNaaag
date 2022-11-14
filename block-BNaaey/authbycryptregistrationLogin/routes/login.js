var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.post('/', function(req, res, next) {
    var { email, password } = req.body;
    if (!email || !password) {
        res.render('login', { title: 'Login' });
    }
    User.findOne({ email }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            res.render('login', { title: 'Login' });
        }
        user.verifyPassword(password, (err, result) => {
            if (err) return next(err);
            if (!result) {
                res.render('login', { title: 'Login' });
            }
            req.session.UserId = user.id;
            res.redirect("/users")

        })


    })

});


module.exports = router;