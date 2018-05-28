var weichat_conf = require('../conf/weichat.json');
var WechatAPI = require('wechat-api');
var WechatUtil = require('../util/wechat_get.js');
var ImageUtil = require('../util/image_util.js');
var weichat_apis = {};
var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');


function is_purchase(text) {
	if(text == '0'){
		return true;
	}
}

function purchase(openid, config, message,res){
	
}

function subscribe(openid, config, message,res){
	res.replay('欢迎关注💪\r\n完成如下任务可以免费领取的爆款商品！')
}

module.exports.is_purchase = is_purchase;
module.exports.purchase = purchase;
module.exports.subscribe = subscribe;