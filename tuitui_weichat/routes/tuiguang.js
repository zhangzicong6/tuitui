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

router.post('/novel/upload_ad', upload.single('ad_img'), function(req, res, next) {
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
        type: req.body.type,
        id: req.body.id,
		title: req.body.title,
		headline: req.body.headline,
		gonghao: req.body.gonghao,
		author: req.body.author,
		avator: req.body.avator,
		content: req.body.content,
		linkUrl: req.body.linkUrl || '',
        // ad_img: req.body.ad_img || '',
		statisticsUrl: req.body.statisticsUrl
	}
	var user = new TuiGuangModel(novelInfo)
	user.save(function(err, data) {
		if(err) {
			console.log("Error:" + err);
		} else {
            res.send({message: 'success'})
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

router.get('/novel/show', (req, res, next) => {
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

router.post('/novel/update', async(req, res, next) => {
    var id = req.body._id
    var message = {
        type: req.body.type,
        id: req.body.id,
        title: req.body.title,
        headline: req.body.headline,
        gonghao: req.body.gonghao,
        author: req.body.author,
        avator: req.body.avator,
        content: req.body.content,
        linkUrl: req.body.linkUrl || '',
        // ad_img: req.body.ad_img || '',
        statisticsUrl: req.body.statisticsUrl
    }
    var docs = await TuiGuangModel.findByIdAndUpdate(id, message)
    if (docs) {
        res.send({success: '修改成功'})
    } else {
        res.send({err: '修改失败'})
    }
})

module.exports = router;