var express = require('express');
var router = express.Router();
var QRcodeModel = require('../model/QRcode.js');
var weichat_util = require('../util/get_weichat_client.js')
var weichat_conf = require('../conf/weichat.json')

router.get('/show', (req, res, next) => {
    var codes = [];
    for (var key in weichat_conf) {
        codes.push(weichat_conf[key]);
    }
    QRcodeModel.find({}, (err, data) => {
        if (data == '') {
            res.send({err: '没有数据'})
        } else {
            res.send({data: data, codes: codes})
        }
    })
})


router.post('/create', (req, res, next) => {
    var qrInfo = {
        name: req.body.name,
        content: req.body.content,
        code: req.body.code
    }
    var user = new QRcodeModel(qrInfo)
    user.save(function (err, data) {
        if (err) {
            console.log("Error:" + err);
        } else {
            var api = weichat_util.getClient(qrInfo.code);
            var _id = data._id;
            var str = JSON.stringify({replay: _id,tagId:2})
            api.createLimitQRCode(str, (err, result) => {
                var qrUrl = api.showQRCodeURL(result.ticket) || '';
                if (qrUrl == '') {
                    console.log(err)
                } else {
                    QRcodeModel.findByIdAndUpdate(_id, {qr_code_url: qrUrl}, function (err, data1) {
                        if (err) {
                            console.log("Error:" + err);
                        }
                        else {
                            console.log("Res:" + data1);
                            res.send({data: data1})
                        }
                    })
                }
            });
        }
    });
})

router.get('/get_code', (req, res, next) => {
    var codes = [];
    for (var key in weichat_conf) {
        codes.push(weichat_conf[key]);
    }
    res.send({codes: codes})
})

router.post('/update', (req, res, next) => {
    var name = req.body.name
    var content = req.body.content
    var id = req.body.id
    var str = JSON.stringify({replay: id,tagId:2})
    QRcodeModel.findByIdAndUpdate(id, {name: name, content: content}, function (err, data) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + data);
            res.send({data: data})
        }
    })
})

router.post('/deleteOne', (req, res, next) => {
    QRcodeModel.remove({_id: req.body.id}, (err, data) => {
        if (data == '') {
            res.send({err: '没有数据'})
        } else {
            QRcodeModel.find({}, (err, result) => {
                if (result == '') {
                    res.send({success: '已删除最后一条数据', data: result})
                } else {
                    res.send({success: '删除成功', data: result})
                }
            })
        }
    })
})


module.exports = router;