var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var multer = require('multer');
var fs = require('fs')
var mem = require('../util/mem.js')

var upload = multer({
    dest: './public/images/tuiguang'
});

router.post('/novel/upload', upload.single('imageFile'), function(req, res, next) {
	fs.rename(req.file.path, "./public/images/tuiguang/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})


router.get('/novel/:index', function(req, res, next) {
	var selector = {id: req.params.index}
    mem.get('tuiguang_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get tuiguang value---------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/tuiguang',res_data);
        }else{
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            title: data[0].title,
                            headline: data[0].headline,
                            gonghao: data[0].gonghao,
                            author: data[0].author,
                            avator: data[0].avator,
                            content: data[0].content,
                            linkUrl: data[0].linkUrl,
                            statisticsUrl: data[0].statisticsUrl
                        }

                        mem.set('tuiguang_'+req.params.index,JSON.stringify(res_data),60*1000).then(function(){
                             console.log('---------set tuiguang value---------')
                        })
                        res.render('tuiguang/tuiguang',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    });
    
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
			res.send({message: 'success', links: 'http://www.rrdtjj.top/tuiguang/novel/' + novelInfo.id})
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

module.exports = router;