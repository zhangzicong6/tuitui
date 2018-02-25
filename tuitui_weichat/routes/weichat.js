
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var crypto = require('crypto');
var taobao_apiClient = require('../util/taobaoke/index.js').ApiClient;
var weichat_conf = require('../conf/weichat.json');
var taobao_conf = require('../conf/taobao.json');
var OAuth = require('wechat-oauth');
var request_taobao_url =require('../util/taobaoke_util.js').request_taobao_url;


router.use('/', function(req, res, next) {

});

router.use('/:code', function(request, response, next_fun) {
	console.log(request.params.code);
	var config=weichat_conf[request.params.code];
	console.log(config);
	if(request.query.signature && request.query.nonce){
		console.log('validate');
		validate(request,response);
	}else{
		wechat(config,function (req, res, next) {
			var message = req.weixin;
			if (message.MsgType === 'text') {
			    var text = message.Content.trim();
			    var openid = message.FromUserName;
			    var flag = true;
			 	if(flag){
			 		//var api = new OAuth(config.appid, config.appsecret);
			 	}
			 	if(text === '订单'){
			 		getOrders(openid,res);
			 	}else if(text === '个人信息'){
			 		getUser(openid,res);
			 	}else if(/^\d{}18$/.test(text)){
			 		setOrder(openid,text,res);
			    }else if(text.search('】http')){
			    	getTaobaoke(text,res);
			    }
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
		+'当前余额:'+user_order.current_balance+'元\r\n累计提现:'+user_order.addup_cash+'元\r\n━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   温馨提醒◇ ◇ ◇ 收货后，返 会添加到个 账户 余额超过1元，输 “提现”提现',
      	type: 'text'
	});
}

function getOrders(openid,res){
	var orders={
		all_count : 0,
		list:[]
	};

	var str='您共有【'+all_count+'】个订单，近期订单如下: ━┉┉┉┉∞┉┉┉┉━\r\n'+
	+'订单号|  期|状 态|返 \r\n';
	for (var i = 0; i <=orders.length - 1; i++) {
		var order = orders[i];
		str+='*'+order.order_id+'*|'+order.order_date+'|'+order.status+'| -\r\n';
	}
	str += '━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   提醒◇ ◇ ◇ 回复订单号才能获得返 哦! 商品点击收货后 余额超过1元输 “提现”提现。';
	res.reply({
		content: str,
      	type: 'text'
	});
}

function setOrder(openid,order_id,res){
	res.reply('订单【'+order_id+'】标记 成功，稍候系统将 动追踪定单!');
}

function getTaobaoke(text,res){
	var url = text.split('】')[1].split(' ');
	request_taobao_url(url,function(res){
		var str ='【'+res.data.title+'】\r\n ━┉┉┉┉∞┉┉┉┉━\r\n☞ 原价:'+res.data.price+'元\r\n☞ 优惠:'+res.data.tkCommFee+'元\r\n'+
				 '☞ 口令:'+res.taokouling+'\r\n☞ 返利 :'+res.data.couponAmount+'元 \r\n━┉┉┉┉∞┉┉┉┉━\r\n'+
'◇ ◇ ◇   下单步骤◇ ◇ ◇\r\n 1. 按复制本信息打开淘宝下单\r\n 2.下单后将订单号发送给我\r\n[须知]:商品 可使 淘 币进 抵扣 或使 其他店铺优惠 \r\n━┉┉┉┉∞┉┉┉┉━'
		res.reply();
	});
}

module.exports = router;

