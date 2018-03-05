var schedule = require("node-schedule");
var UserOrderModel = require('../model/UserOrder.js');
var TaobaoOrderModel = require('../model/TaobaoOrder.js');
var async = require('async');

function get_order(){
	async.waterfall([
		function(callback){
			UserOrderModel.count({status:{$gt:-1,$lt:3}},callback);
		},
		function(count,callback){

		},	
		],function(err,result){

	});
}


function update_order(_id){
	UserOrderModel.fetch(_id,function(err,result){
		result.each(function(order){
			TaobaoOrderModel.findOne({order_id:order.order_number},function(error,taobao){
				order.status = getOrderStatus(taobao.order_status);
				if( order.status == 3){
					order.tk_comm_fee = parseFloat(taobao.order_tkCommFee);
				}
				order.save();
			});
		});
		if(result.length==50){
			update_order(result[49]._id);
		}
	});
}


function getOrderStatus(status){
	if(status == '订单失效'){
		return -1;
	}else if(status == '订单付款'){
		return 1;
	}else if(status == '订单成功'){
		return 2;
	}else if(status == '订单结算'){
		return 3;
	}
}