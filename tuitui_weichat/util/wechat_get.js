var TokenModel = require('../model/Token.js');
var weichat_conf = require('../conf/weichat.json');
var WechatAPI = require('wechat-api');

function getClient(code) {
	var config=weichat_conf[code];
	console.log(config);
	var api = new WechatAPI(config.appid, config.appsecret, function (callback) {
	  // 传入一个获取全局token的方法
		TokenModel.findOne({code:code},function(err,token){
		  	callback(err,token);
		});
	}, function (token, callback) {
		// 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
		token.code = code
		TokenModel.findOneAndUpdate({code:code},{$set:token},{upsert:true,rawResult:true,new:true},function(err,token){
			callback(err,token);
		});
	});
	return api;
}


function getQr(code,openid,book_id,next){
	var client = getClient(code);
	client.createTmpQRCode(JSON.stringify({openid:openid,book:book_id}),2592000,function(err,reslut){
		if(err){
			console.log(err);
			return next(err);
		}
		var qr_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+reslut.ticket; 
		console.log(qr_url);
		next(null,qr_url);
	});
}

function QRCode(){
	var client = getClient(['1']);
	client.createLimitQRCode(JSON.stringify({openid:'o3qBK0RXH4BlFLEIksKOJEzx08og',book:'239'}), function(err,reslut){
		if(err){
			console.log(err);
		}
		var qr_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+reslut.ticket; 
		console.log(qr_url);
		
	});
}

//QRCode();

module.exports.getClient = getClient;
module.exports.getQr = getQr;