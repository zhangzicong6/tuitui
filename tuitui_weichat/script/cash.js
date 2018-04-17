var UserAlipayCashModel = require('../model/UserAlipayCash.js');
var User = require('../model/User.js');
var zhifubao_util = require('../util/zhifubao_util.js');
var async = require('async');
var ing =false;

var next_up = function(flag){
		ing =false;
}

function exec_cash(){
	if(ing){
		return '程序正在执行';
	}
	ing = true;
	send_money(null,next_up);
}

function send_money(id,next_cb) {
	
	UserAlipayCashModel.fetch_tixian(id,function(error,cashs){
		async.each(cashs,function(cash,callback){
			zhifubao_util.trans_by_api({
				"out_biz_no":cash.out_biz_no,
				"payee_type":"ALIPAY_LOGONID",
				"payee_account":cash.payee_account,
				"amount":cash.price,
				"payer_show_name":"明星说",
				"payee_real_name":cash.payee_real_name,
				"remark":"购物提现"
			},function(err,res){
				if(err){
					cash.status = -2;
					cash.err_msg = err.data.sub_msg;
					User.findOneAndUpdate({openid:cash.openid},{$inc:{current_balance:cash.price}},function(e,user){});
				}else{
					cash.status = 2;
					cash.order_id = res.data.order_id;
					User.findOne({openid:cash.openid},function(e,user){
						if(!user){
							if( user.addup_cash ){
								user.addup_cash =parseFloat((user.addup_cash+cash.price).toFixed(2));
							}else{
								user.addup_cash =cash.price;
							}
							user.save();
						}
					});
				}
				cash.save();
				callback(null);
			});
		},function(err,reslut){
			console.log(cashs);
			if(cashs.length==50){
				return send_money(cashs[49]._id,next_cb);
			}else{
				return next_cb(1);
			}
		})
	});
}

module.exports.exec_cash = exec_cash;