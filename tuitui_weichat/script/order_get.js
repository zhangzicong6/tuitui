var schedule = require("node-schedule");
var UserOrderModel = require('../model/UserOrder.js');
var TaobaoOrderModel = require('../model/TaobaoOrder.js');
var UserModel = require('../model/User.js');
var AddFreeOrderModel = require('../model/AddFreeOrder.js');

var WechatAPI = require('wechat-api');
var weichat_conf = require('../conf/weichat.json');
var weichat_apis ={};
var async = require('async');

function get_order(){
	update_order(null);
}


function update_order(_id){
	UserOrderModel.fetch(_id,function(err,result){

		async.each(result,function(order,cb){
			TaobaoOrderModel.findOne({order_id:order.order_number},function(error,taobao){
				if(taobao == null){
					return cb(null);
				}
				if(order.status == 0 ){
					order.create_at = taobao.create_at;
					UserModel.findOne({openid:order.openid},function(err,user){
						if(!weichat_apis[user.code]){
							var config = weichat_conf[user.code];
							weichat_apis[user.code] = new WechatAPI(config.appid, config.appsecret);
						}
						user.all_count += 1;
						user.unfinished_count +=1;
						user.save();
						var client = weichat_apis[user.code];
						var str = '恭喜您！订单【'+taobao.order_id+'】【'+taobao.goods_info+'】跟踪成功！\r\n'+
									'[须知]:商品确认收货后半小时返利会添加到个人账户\r\n\r\n一一一🍉常用指令一一一\r\n'+
									'账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现';
						client.sendText(msg.openid, str, function(err,result){
							console.log(err);
						});
					});
				}
				order.status = getOrderStatus(taobao.order_status);
				if(order.status == -1){
					UserModel.findOneAndUpdate({openid:order.openid},{$inc:{unfinished_count:-1,finished_count:1}},function(error,user){
						console.log(error);
					});
				}
				if( order.status == 3){
					var add_cash = parseFloat(taobao.order_tkCommFee);
					order.tk_comm_fee = add_cash;
					AddFreeOrderModel.create({openid:order.openid,type:1,cash:add_cash,order_number:order.order_number});
					UserModel.findOneAndUpdate({openid:order.openid},{$inc:{current_balance:add_cash,unfinished_count:-1,finished_count:1}},function(error,user){
						console.log(error);
					});
				}
				order.save();
				cb(null);
			});
		});
		if(result.length==50){
			update_order(result[49]._id);
		}
	},function(error,result){
		console.log(error);
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

var rule    = new schedule.RecurrenceRule();  
var times   = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule.minute  = times; 
var j = schedule.scheduleJob(rule, function(){
  console.log('匹配订单');
  get_order();
});