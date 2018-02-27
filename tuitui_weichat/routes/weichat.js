
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var crypto = require('crypto');
var taobao_apiClient = require('../util/taobaoke/index.js').ApiClient;
var weichat_conf = require('../conf/weichat.json');
var taobao_conf = require('../conf/taobao.json');
var request_taobao_url =require('../util/taobaoke_util.js').request_taobao_url;
var async = require('async');

var TokenModel = require('../model/Token.js');
var UserModel = require('../model/User.js');
var UserOrderModel = require('../model/UserOrder.js');

router.use('/:code', function(request, response, next_fun) {
	var config=weichat_conf[request.params.code];
	
	if(!request.query.openid){
		console.log('validate');
		validate(request,response);
	}else{
		wechat(config,function (req, res, next) {
			var message = req.weixin;
			getUserInfo(openid,config);
			if (message.MsgType === 'text') {
			    var text = message.Content.trim();
			    var openid = message.FromUserName;
			 	if(text === '订单'){
			 		getOrders(openid,res);
			 	}else if(text === '个人信息'){
			 		getUser(openid,res);
			 	}else if(/^\d{18}$/.test(text)){
			 		setOrder(openid,text,res);
			    }else if(text.search('】http')!=-1){
			    	getTaobaoke(text,res);
			    }else{
			    	res.reply('其他功能疯狂开发中');
			    }
			}else if(message.MsgType === 'event'){
				if(message.Event === 'subscribe' ){
					res.reply('美淘日记欢迎您！\r\n一一一一使用攻略一一一一\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n文字教程：http://t.cn/RE5GRzg\r\n一一一一🍒常用指令一一一一\r\n'+
					'账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现');
				}else{
					res.reply('其他功能疯狂开发中');
				}
			}else{
				res.reply('其他功能疯狂开发中');
			}
		})(request, response, next_fun);
	}
});

function validate(req,res){
	var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var token ='mingxingshuo';

    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");
  
    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");
  	
  	console.log(echostr);
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code===signature){
        res.send(echostr);
    }else{
        res.send("error");
    }
}

function getUser(openid,res){
	var user_order={
		all_count : 0,
		finished_count : 0,
		unfinished_count : 0,
		current_balance : 0,
		addup_cash : 0,
	};
	res.reply({
		content: '━┉┉┉┉∞┉┉┉┉━\r\n订单总数:'+user_order.all_count+'笔\r\n已完成数:'+user_order.finished_count+'笔\r\n未完成数:'+user_order.unfinished_count+'笔\r\n'+
		+'当前余额:'+user_order.current_balance+'元\r\n累计提现:'+user_order.addup_cash+'元\r\n━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   温馨提醒◇ ◇ ◇ \r\n收货后，返 会添加到个 账户 余额超过1元，输 “提现”提现',
      	type: 'text'
	});
}

function getOrders(openid,res){
	var orders={
		all_count : 0,
		list:[]
	};
	var str='您共有【'+orders.all_count+'】个订单，近期订单如下:\r\n ━┉┉┉┉∞┉┉┉┉━\r\n'+
	'订单号|日 期|状 态|返 利\r\n';
	for (var i = 0; i <=orders.list.length - 1; i++) {
		var order = orders.list[i];
		str+='*'+order.order_id+'*|'+order.order_date+'|'+order.status+'| -\r\n';
	}
	str += '━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   提醒◇ ◇ ◇ \r\n回复订单号才能获得返利哦! 商品点击收货后 余额超过1元输 “提现”提现。';
	//console.log(str);
	res.reply({
		content: str,
      	type: 'text'
	});
}

function setOrder(openid,order_id,res){
	res.reply('订单【'+order_id+'】标记 成功，稍候系统将 动追踪定单!');
}

function getTaobaoke(text,res){
	var url = text.split('】')[1].split(' ')[0];
	console.log(url);
	request_taobao_url(url,function(result){
		if(result){
			var str ='【'+result.data.title+'】\r\n ━┉┉┉┉∞┉┉┉┉━\r\n☞ 原价:'+result.data.price+'元\r\n☞ 优惠:'+result.data.tkCommFee+'元\r\n'+
				 '☞ 口令:'+result.taokouling+'\r\n☞ 返利 :'+result.data.couponAmount+'元 \r\n━┉┉┉┉∞┉┉┉┉━\r\n'+
				'◇ ◇ ◇   下单步骤◇ ◇ ◇\r\n 1. 按复制本信息打开淘宝下单\r\n 2.下单后将订单号发送给我\r\n[须知]:商品可使淘币进抵扣或使用其他店铺优惠 \r\n━┉┉┉┉∞┉┉┉┉━'
			//console.log(str);
			res.reply(str);
		}else{
			res.reply("未找到有关商品");
		}	
	});
}

function getUserInfo(openid,config){
	var client = new WechatAPI(config.appid, config.appsecret);
	async.waterfall([
			function(callback){
				UserModel.findOne({openid:openid,code:config.code},function(err,user){
					if(!user){
						console.log('无用户');
						callback(null);
					}else{
						callback('用户存在');
					}
				});
			},function(callback){
				getAccessToken(config.code,function(token){
					console.log(token);
					callback(null,token);
				});
			},
			function(token,callback){
				client.getUser(openid, function(err,user){
					user.code=config.code;
					UserModel.create(user);
					console.log(user);
					callback(null,null);
				});
			}
		],function(err,res){
			if(err){
				console.log(err);
			}
	});
}

function getAccessToken(code,callback){
	var config=weichat_conf[code];
	var client = new WechatAPI(config.appid, config.appsecret);
	async.waterfall([
			function(callback){
				TokenModel.findOne({code:config.code},function(err,token){
					if(!token){
						callback(null,-1,{code:config.code});
					}else if(token.expireTime<=Date.now()){
						callback(null,0,token);
					}else{
						callback(null,1,token);
					}
				});
			},
			function(flag,token,callback){
				if(flag === 1){
					return callback(null,token);
				}else{
					client.getLatestToken(function(err,weichat_token){
						if(err){
							callback(err);
						}else{
							weichat_token.code = token.code
							if(flag === -1){
								TokenModel.create(weichat_token,function(err){
									console.log('create');
								});
							}else{
								TokenModel.findOneAndUpdate({code:weichat_token.code,function(err){
									console.log('update');
								}});
							}
							return callback(null,weichat_token);
						}
					});
				}
			},

		],function(err,token){
			callback(token);
	});
}


//getUserInfo('o3qBK0RXH4BlFLEIksKOJEzx08og',weichat_conf['1']);

module.exports = router;

