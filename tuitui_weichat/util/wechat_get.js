var TokenModel = require('../model/Token.js');
var weichat_conf = require('../conf/weichat.json');
var WechatAPI = require('wechat-api');

function getClient(code) {
	var config=weichat_conf[code];
	var api = new API(config.appid, config.appsecret, function (callback) {
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
}