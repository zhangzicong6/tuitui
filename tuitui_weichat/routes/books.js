var express = require('express');
var router = express.Router();
var BookContentModel = require('../model/BookContent.js');
var BookModel = require('../model/Book.js');


router.use('/create', function(req, res, next) {
	var content = req.body.content;
	content = JSON.parse(content);
	BookModel.findOne({book_id:content.book_id},function(err,book){
		if(!book){
			BookModel.create({book_id:content.book_id,bookname:content.bookname});
		}
	});
	BookContentModel.create(content);
	res.send('success');
});


module.exports = router;
