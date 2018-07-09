var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var multer = require('multer');
var fs = require('fs')

var upload = multer({
    dest: './public/uploads'
});

router.post('/upload', upload.single('imageFile'), function(req, res, next) {
	fs.rename(req.file.path, "./public/uploads/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})


router.get('/novel/:index', function(req, res, next) {
	var selector = {id: req.params.index}
    TuiGuangModel.find(selector, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.render('tuiguang/tuiguang', {
				title: data[0].title,
				headline: data[0].headline,
				gonghao: data[0].gonghao,
				author: data[0].author,
				avator: data[0].avator,
				content: data[0].content,
				linkUrl: data[0].linkUrl,
				statisticsUrl: data[0].statisticsUrl
			});
        }
    })
})

router.post('/add', (req, res, next) => {
	var novelInfo = {
		id: req.body.id,
		title: req.body.title,
		headline: req.body.headline,
		gonghao: req.body.gonghao,
		author: req.body.author,
		avator: req.body.avator,
		content: req.body.content,
		linkUrl: req.body.linkUrl,
		statisticsUrl: req.body.statisticsUrl
	}
	var user = new TuiGuangModel(novelInfo)
	user.save(function(err, data) {
		if(err) {
			console.log("Error:" + err);
		} else {
			res.send('success')
		}
	});
})
module.exports = router;