var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var multer = require('multer');
var fs = require('fs')

var upload = multer({
    dest: __dirname+'/../public/images/tuiguang'
});

router.post('/novel/upload', upload.single('imageFile'), function(req, res, next) {
	fs.rename(req.file.path, __dirname+"/../public/images/tuiguang/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})


router.post('/novel/add', (req, res, next) => {
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
			res.send({message: 'success', links: 'http://www.jswoge.top/tuiguang/novel/' + novelInfo.id})
		}
	});
})

router.post('/novel/delete_one', (req, res, next) => {
    var selector = {
        id: req.body.id
    }
    TuiGuangModel.find(selector, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            if (data != '') {
                TuiGuangModel.remove(selector, function(err, result){
                    res.send({message: '删除成功'})
                })
            } else {
                res.send({message: '没有此项数据'})
            }
        }
    })
})

router.get('/novel/show_id', (req, res, next) => {
    TuiGuangModel.find({}, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            if (data != '') {
                res.send({data: data})
            } else {
                res.send({err: '没有数据'})
            }
        }
    })
})

module.exports = router;