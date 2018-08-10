var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var DomainModel = require('../model/Domain');
var multer = require('multer');
var fs = require('fs')
var mem = require('../util/mem.js')

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
    TuiGuangModel.find({id: req.body.id}, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }else {
            if (data != '') {
                res.send({err: '此id已存在'})
            } else {
                var novelInfo = {
                    type: req.body.type,
                    id: req.body.id,
                    pageTitle: req.body.pageTitle,
                    articleTit: req.body.articleTit,
                    name: req.body.name,
                    desc: req.body.desc,
                    picurl: req.body.picurl,
                    capter1: req.body.capter1,
                    capter2: req.body.capter2 || '',
                    linkUrl: req.body.linkUrl || '',
                    statisticsUrl1: req.body.statisticsUrl1,
                    statisticsUrl2: req.body.statisticsUrl2 || '',
                    tokenCodes: req.body.tokenCodes || '',
                    channel: req.body.channel,
                    remarks: req.body.remarks
                }
                var user = new TuiGuangModel(novelInfo)
                user.save(function(err, data) {
                    if(err) {
                        console.log("Error:" + err);
                    } else {
                        res.send({message: '创建成功'})
                    }
                });
            }
        }
    })
	
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
    var domain_names = await DomainModel.find();
    TuiGuangModel.find({}, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            if (data != '') {
                res.send({data: data, domain_names: domain_names})
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
        pageTitle: req.body.pageTitle,
        articleTit: req.body.articleTit,
        name: req.body.name,
        desc: req.body.desc,
        picurl: req.body.picurl,
        capter1: req.body.capter1,
        capter2: req.body.capter2 || '',
        linkUrl: req.body.linkUrl || '',
        statisticsUrl1: req.body.statisticsUrl1,
        statisticsUrl2: req.body.statisticsUrl2 || '',
        tokenCodes: req.body.tokenCodes || '',
        channel: req.body.channel,
        remarks: req.body.remarks
    }
    var docs = await TuiGuangModel.findByIdAndUpdate(id, message)
    if (docs) {
        mem.set('weitiao_'+req.params.index,{},60).then(function(){
             console.log('---------set weitiao value---------')
        })
        mem.set('singlepage_'+req.params.index,{},60).then(function(){
             console.log('---------set singlepage value---------')
        })
        mem.set('multipage_'+req.params.index,{},60).then(function(){
             console.log('---------set multipage value---------')
        })
        mem.set('capter_'+req.params.index,{},60).then(function(){
             console.log('---------set capter value---------')
        })
        res.send({success: '修改成功'})
    } else {
        res.send({err: '修改失败'})
    }
})

module.exports = router;