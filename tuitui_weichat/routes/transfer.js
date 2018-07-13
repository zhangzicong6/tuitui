var express = require('express');
var router = express.Router();
var TransferModel = require('../model/Transfer');

router.get('/', async(req, res, next) => {
    var messages = await TransferModel.find().limit(20).sort({_id: -1});
    res.render('transfer/content',{messages: messages})
})

router.get('/detail/:id', async(req, res, next) => {
    console.log(req.params.id,'-------------------')
    res.render('transfer/detail')
})

router.post('/create', async(req, res, next)=> {
    var message = {
        id:req.body.id,
        title: req.body.title,
        links: req.body.links
    }
    var docs = await TransferModel.create(message);
    res.redirect('/transfer')
    // if (docs) {
    //     res.render('',{success: '成功'})
    // } else {
    //     res.send({err: '创建失败，请检查输入是否有误'})
    // }
})

router.post('/update', async(req, res, next) => {
    var id = req.body.id;
    var message = {
        id:req.body.id,
        title: req.body.title,
        links: req.body.links
    }
    var docs = await TransferModel.findByIdAndUpdate(id, message)
    if (docs) {
        res.send({success: '修改成功', data: docs})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/delete', async(req, res, next) => {
    var id = req.query.id;
    await TransferModel.findByIdAndDelete(id)
    var docs1 = await TransferModel.find()
    res.send({success: '删除成功', data: docs})
})


module.exports = router
