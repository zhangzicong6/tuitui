
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var crypto = require('crypto');
var taobao_apiClient = require('../util/taobaoke/index.js').ApiClient;
var weichat_conf = require('../conf/weichat.json');
var book_wechat_conf = require('../conf/book_wechat.json');
var taobao_conf = require('../conf/taobao.json');
var TaobaoUtil =require('../util/taobaoke_util.js');
var async = require('async');

var TokenModel = require('../model/Token.js');
var UserModel = require('../model/User.js');
var UserOrderModel = require('../model/UserOrder.js');
var AddFreeOrderModel = require('../model/AddFreeOrder.js');
var BookModel = require('../model/Book.js');
var UserBookAuthorityModel = require('../model/UserBookAuthority.js');

var MessageServer = require('../message_server.js');
var weichat_apis ={};

var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

router.use('/:code', function(request, response, next_fun) {
	var config=weichat_conf[request.params.code];
	if(!request.query.openid){
		//console.log('validate');
		validate(request,response);
	}else{
		wechat(config,function (req, res, next) {
			var message = req.weixin;
			var openid = message.FromUserName;
			getUserInfo(openid,config);
			if (message.MsgType === 'text') {
			    var text = message.Content.trim();
			 	if(text === '帮助'){
			 		res.reply('图文教程:http://t.cn/RETghsf\r\n———— 省钱攻略 ———— \r\n1.打开手机淘宝，选中购买的产品。\r\n'+
			 			'2.点击商品名右侧的“分享(有赏)”，分享给我。\r\n3.复制我返回的信息。\r\n4.打开淘宝放入购物车或付款购买。\r\n注:不可使用淘金币进行抵扣\r\n'+
			 			'5.点击查看订单，把订单号发给我获得返利。\r\n———— 常用指令———— \r\n账户信息请回复:个人信息\r\n订单查询请回复:订单\r\n余额提现请回复:提现 \r\n详细教程请回复:帮助');
			 	}else if(text === '订单'){
			 		getOrders(openid,res);
			 	}else if(text === '个人信息'){
			 		getUser(openid,res);
			 	}else if(text === '提现'){
			 		cash(openid,res);
			 	}else if(/^\d{5,8}$/.test(text)){
			 		getCode(openid,text,res);
			    }else if(/^\d{15,20}$/.test(text)){
			 		setOrder(openid,text,res);
			    }else if(/^\d{9,14}$/.test(text)||/^\d{21,}$/.test(text)){
			 		res.reply('无效订单号，请您检查订单号!');
			    }else if(text.search('】http')!=-1){
			    	getTaobaoke(config,openid,text,res);
			    }else if(/￥[0-9a-zA-Z]{11}￥/.test(text)){
			    	getTaobaoke_byCode(config,openid,text,res);
			    }else if(text === '搜索小说'){
			    	res.reply('https://wx68113a82c6654025.youshuge.com/lookbook/2724/1095/547202/pop/');
			    }else{
			    	res.reply('');
			    }
			}else if(message.MsgType === 'event'){
				if(message.Event === 'subscribe' ){
					var code_list = book_wechat_conf.book_wechat_list;
					if(code_list.indexOf(request.params.code)==-1){
						res.reply('');
					}else{
						var book_id = book_wechat_conf.book_wechat_map[request.params.code];
						replay_book(book_id,message,res);
						if(message.Ticket){
							getXiaoshuo(message,request.params.code);
						}
					}
					
					/*res.reply('美淘日记欢迎您！\r\n回复10000或好友邀请码领红包!\r\n一一一一使用攻略一一一一\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n图文教程：http://t.cn/RETghsf\r\n一一一一🍒常用指令一一一一\r\n'+
					'账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现\r\n详细教程请回复：帮助');*/
				}else{
					res.reply('');
				}
			}else{
				res.reply('');
			}
		})(request, response, next_fun);
	}
});


function replay_book(book_id,message,res){
	var conf = book_wechat_conf[book_id];
	var openid = message.FromUserName;
	console.log(openid+" , "+book_id);
	UserBookAuthorityModel.findOne({book_id:book_id,openid:openid},function(err,auth){
		if(!auth){
			UserBookAuthorityModel.create({
				book_id:book_id,
				openid:openid,
				can_read:20
			},function(error,res){
				console.log(res);
			});
		}
	});
	if(message.Ticket){
		var str = '欢迎关注「'+conf.name+'」，为您推荐超赞的言情小说：\r\n';
		str +=  '<a href="http://tiexie0.top/books/continue/'+conf.book_id+'">《'+conf.bookname+'》</a>\r\n';
		for (var i =  0; i < conf.other_books.length; i++) {
			var book = conf.other_books[i];
			str += '<a href="http://tiexie0.top/books/continue/'+book.book_id+'">《'+book.bookname+'》</a>\r\n'
		}
		res.reply(str);
	}else{
		var str = '欢迎关注「'+conf.name+'」，您正在阅读《'+conf.bookname+'》\r\n';
		str +=  '<a href="http://tiexie0.top/books/continue/'+conf.book_id+'">点我继续阅读</a>\r\n\r\n\r\n';
		str += '猜您喜欢：\r\n';
		for (var i =  0; i < conf.other_books.length; i++) {
			var book = conf.other_books[i];
			str += '<a href="http://tiexie0.top/books/continue/'+book.book_id+'">《'+book.bookname+'》</a>\r\n'
		}
		res.reply(str);
	}	
}

function getXiaoshuo(message,code){
	memcached.get(message.Ticket,function(err,content){
		console.log(content);
		if(content){
			var obj = JSON.parse(content);
			UserBookAuthorityModel.findOneAndUpdate({book_id:obj.book,openid:obj.openid},{$addToSet:{invitees:message.FromUserName}},{upsert: true, new: true},function(err,auth){
				console.log(auth);
				if(auth.invitees.length == 2){
					sendBookMessage(auth,code);
				}
				if(auth.invitees.length == 5){
					auth.can_read=30;
					auth.save();
					sendBookMessage(auth,code);
				}
			});
		}
	});
	
}

function sendBookMessage(auth,code){
	var config = weichat_conf[code];
	if(!weichat_apis[config.code]){
		weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
	}
	var client = weichat_apis[config.code];
	var str = '进度';
	if(auth.invitees.length<5){
	}else{
		str +=  '<a href="http://tiexie0.top/books/continue/'+auth.book_id+'">【'+点我继续阅读+'】</a>\r\n';	
	}
	client.sendText(auth.openid, str, function(err,result){
		console.log(err);
	});
}

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


function getCode(openid,text,res){
	async.waterfall([
		function(callback){
			AddFreeOrderModel.findOne({openid:openid,type:2},function(error,result){
				if(result){
					callback('你已绑定邀请码'+result.auction+',请不要重复绑定！');
				}else{
					var cash = parseFloat((Math.random()*3+12).toFixed(2));
					callback(null,cash);
				}
			});
		},
		function(cash,callback){
			var auction = parseInt(text);
			if(auction!=10000){
				async.waterfall([
						function(callback){
							UserModel.findOne({auction:auction},function(error,user){
								callback(error,user);
							});
						},function(user,callback){
							var bind_cash = parseFloat((Math.random()*0.2+0.3).toFixed(2));
							AddFreeOrderModel.create({openid:user.openid,type:3,cash:bind_cash,auction:user.auction});
							user.current_balance += bind_cash;
							user.save();
							callback(null);
						}
					],function(error,result){
						if(error){
							console.log(error);
						}
				});
			}

			AddFreeOrderModel.create({openid:openid,type:2,cash:cash,auction:auction});
			UserModel.findOneAndUpdate({openid:openid},{$inc:{current_balance:cash}},function(error,user){
				callback(null,cash,user);
			});
		}
		],function(error,cash,user){
			if(error){
				return res.reply(error);
			}
			return res.reply('赠送您【'+cash.toFixed(2)+'】元\r\n账户余额：【'+(user.current_balance + cash).toFixed(2)+'】元\r\n'+'ヾ(≧▽≦*)o超过1元可提现\r\n'+
							'⼀⼀⼀⼀使⽤攻略⼀⼀⼀⼀\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n教程：http://t.cn/RETghsf');
	});
}

//待开发
function cash(openid,res){
	UserModel.findOne({openid:openid},function(error,user){
		current_balance=user.current_balance;
		if(parseFloat(current_balance.toFixed(2))<20){
			res.reply('您的余额为【'+current_balance.toFixed(2)+'】元，要达到【20.0】元才可以提现哦！');
		}else{
			res.reply('您的余额为【'+current_balance.toFixed(2)+'】元。提现功能正在玩命开发中，两周后和您见面');
		}
	});
}


function getUser(openid,res){
	UserModel.findOne({openid:openid},function(error,user){
		if(!user.auction){
			var query = UserModel.find({$or:[
				{auction:{$ne:0}},
				{auction:{$ne:null}},
				]}).sort({auction:-1}).limit(1);
			query.exec(function(error,tmps){
				if( tmps.length && tmps[0].auction>10000 ){
					user.auction = tmps[0].auction+1;
				}else{
					user.auction = 10000+1;
				}
				user.save();
			});
			sendUserMessage(openid,user,res);	
		}else{
			sendUserMessage(openid,user,res);
		}
	});
}

function sendUserMessage(openid,user,res){
	async.parallel([
			function(callback){
				UserOrderModel.count({openid:openid,status:{$ne:0}},callback);
			},
			function(callback){
				UserOrderModel.count({openid:openid,$or:[{status:-1},{status:3}]},callback);
			},
			function(callback){
				UserOrderModel.count({openid:openid,$or:[{status:1},{status:2}]},callback);
			},
		],function(err,counts){
			var str = '━┉┉┉┉∞┉┉┉┉━\r\n订单总数:'+counts[0]+'笔\r\n已完成数:'+counts[1]+'笔\r\n未完成数:'+counts[2]+'笔\r\n'+
				'当前余额:'+user.current_balance.toFixed(2)+'元\r\n累计提现:'+user.addup_cash.toFixed(2)+'元\r\n━┉┉┉┉∞┉┉┉┉━\r\n'+
				'个人邀请码：【'+user.auction+'】\r\n'+'◇ ◇ ◇ 温馨提醒◇ ◇ ◇ \r\n收货后，返会添加到个账户余额超过1元，输入 “提现”提现';
			//console.log(str);
			res.reply({
				content: str,
		      	type: 'text'
			});
	});
}

function getOrders(openid,res){
	async.parallel([
	    //并行同时执行
	    function(callback) {
	        UserOrderModel.count({openid:openid,status:{$ne:0}},callback);
	    },
	    function(callback) {
	       var query= UserOrderModel.find({openid:openid,status:{$ne:0}}).sort({updateAt:-1}).limit(5);
			query.exec(callback);
	    }
	],
	function(err, results) {
	   	orders={};
	   	orders.all_count = results[0];
	   	orders.list = results[1];
	   	var str='您共有【'+orders.all_count+'】个订单，近期订单如下:\r\n ━┉┉┉┉∞┉┉┉┉━\r\n'+
		'订单号|日 期|状 态|返 利\r\n';
		for (var i = 0; i <=orders.list.length - 1; i++) {
			var order = orders.list[i];
			str += '***'+order.order_number.substr(5,5)+'***|'+order.create_at.substr(0,10)+'|'+getOrderStatus(order.status)+'| '+(order.tk_comm_fee?order.tk_comm_fee:'-')+' \r\n';
		}
		str += '━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   提醒◇ ◇ ◇ \r\n回复订单号才能获得返利哦! 商品点击收货后 余额超过1元输 “提现”提现。';
		//console.log(str);
		res.reply({content: str,type: 'text'});
	});
}

function getOrderStatus(status){
	if(status == 0){
		return '待追踪'
	}else if(status == 1){
		return '付款'
	}else if(status == 2){
		return '成功'
	}else if(status == 3){
		return '结算'
	}else if(status == -1){
		return '失效'
	}
}

function setOrder(openid,order_number,res){
	async.waterfall([
			function(callback){
				UserOrderModel.findOne({order_number:order_number},function(err,uo){
					if(uo){
						return callback('已绑定订单，正在跟踪订单,请耐心等候！');
					}
					callback(null);
				});
			},
			function(callback){
				UserOrderModel.create({order_number:order_number,openid:openid,status:0});
				callback(null);
			}
		],function(error,result){
			if(error){
				res.reply(error);
			}else{
				res.reply('订单【'+order_number+'】标记成功，稍后系统将自动追踪订单！');
			}
	});
}

function getTaobaoke_byCode(config,openid,text,res){
	var code = text.substr(text.search(/￥[0-9a-zA-Z]{11}￥/),13);
	TaobaoUtil.request_taobao_token(code,function(err,result){
		if(err){
			return res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
		}
		if(result && result.data){
			res.reply('');
			data = result.data;
			data.openid = openid;
			data.code = config.code;
			MessageServer.getInstance(null).req_token(data);
		}else{
			res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
		}	
	});
}

function getTaobaoke(config,openid,text,res){
	var url = text.split('】')[1].split(' ')[0];
	TaobaoUtil.request_taobao_url(url,function(err,result){
		if(err){
			return res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
		}
		if(result && result.data){
			res.reply('');
			data = result.data;
			data.openid = openid;
			data.code = config.code;
			MessageServer.getInstance(null).req_token(data);
		}else{
			res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
		}	
	});
}

function getUserInfo(openid,config){
	if(!weichat_apis[config.code]){
		weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
	}
	var client = weichat_apis[config.code];
	async.waterfall([
			function(callback){
				UserModel.findOneAndUpdate({openid:openid,code:config.code},{action_time:Date.now()},function(err,user){
					if(!user){
						//console.log('无用户');
						callback(null);
					}else{
						callback('用户存在');
					}
				});
			},function(callback){
				getAccessToken(config.code,function(token){
					//console.log(token);
					callback(null,token);
				});
			},
			function(token,callback){
				client.getUser(openid, function(err,user){
					user.code = config.code;
					user.current_balance = 0;
					UserModel.create(user);
					//console.log(user);
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
	if(!weichat_apis[config.code]){
		weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
	}
	var client = weichat_apis[config.code];

	async.waterfall([
			function(callback){
				TokenModel.findOne({code:config.code},function(err,token){
					if(!token){
						console.log('无token');
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
							TokenModel.findOneAndUpdate({code:weichat_token.code},{$set:weichat_token},{upsert:true,rawResult:true},function(err){
								console.log('update');
							});
							
							return callback(null,weichat_token);
						}
					});
				}
			},

		],function(err,token){
			callback(token);
	});
}


/*
// 测试使用
router.use('/',function(request, response, next_fun){
	getTaobaoke(weichat_conf['1'],'o3qBK0RXH4BlFLEIksKOJEzx08og',
	'【遥控智能机器人玩具对话儿童男孩小胖会讲故事跳舞新威尔机械战警】http://m.tb.cn/h.WtyRn3h 点击链接，再选择浏览器打开；或复制这条信息￥cTMi0n4KTkA￥后打开👉手淘👈',
	null);
	response.send('test');
});

*/

//getUser('o3qBK0X47Wfngfu_0dmCqSQwwtgU',weichat_conf['1']);

module.exports = router;

