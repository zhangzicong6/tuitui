var express = require('express');
var router = express.Router();

var UserOrderModel = require('../model/UserOrder.js');
var TaobaoOrderModel = require('../model/TaobaoOrder.js');


router.use('/data', function(req, res, next) {
	console.log(req.body.orders);
	var orders = req.body.orders;
	orders = JSON.parse(orders);
	for (var i = orders.length - 1; i >= 0; i--) {
		order = orders[i];
		TaobaoOrderModel.findOneAndUpdate({order_id:order.order_id},{$set :order},{upsert:true})
	}
	res.send('success');
});

module.exports = router;
