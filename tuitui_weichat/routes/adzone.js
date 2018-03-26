var express = require('express');
var router = express.Router();


router.get('/getjs/:time.js', function(req, res, next) {
	var conf = require('../conf/adzone.json');
    res.render('adzone/mew_js', conf);
});

module.exports = router;
