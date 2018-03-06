var express = require('express');
var router = express.Router();

var UserModel = require('../model/User.js');
var UserOrderModel = require('../model/UserOrder.js');
var TaobaoOrderModel = require('../model/TaobaoOrder.js');


router.use('/data', function(req, res, next) {
	console.log('上传订单');
	console.log(req.body.orders);
	var orders = req.body.orders;
	orders = JSON.parse(orders);
	for (var i = orders.length - 1; i >= 0; i--) {
		order = orders[i];
		TaobaoOrderModel.findOneAndUpdate({order_id:order.order_id},{$set :order},{upsert:true,rawResult:true},function(err,order){
			//console.log('update');
		})
	}
	res.send('success');
});


router.use('/reset', function(req, res, next) {
	console.log('重置订单');
	var openid = req.query.openid
	UserModel.findOneAndUpdate({openid:openid},{finished_count:0,unfinished_count:0,all_count:0});
	res.send('success');
});

module.exports = router;
