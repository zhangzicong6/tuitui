var express = require('express');
var router = express.Router();
var BookContentModel = require('../model/BookContent.js');
var BookModel = require('../model/Book.js');
var BookModel = require('../model/Book.js');
var UserModel = require('../model/User.js');
var WechatUtil =require('../util/wechat_get.js');
var ImageUtil =require('../util/image_util.js');
var book_wechat_conf = require('../conf/book_wechat.json');
var WechatAPI = require('wechat-api');
var request = require('request');
var async = require('async');
var NodeCache = require("node-cache");
var myCache = new NodeCache();


router.use('/create', function(req, res, next) {
	var content = req.body.content;
	content = JSON.parse(content);
	BookModel.findOne({book_id:content.book_id},function(err,book){
		if(!book){
			BookModel.create({book_id:content.book_id,bookname:content.bookname});
		}
	});
	BookContentModel.create(content);
	res.send('success');
});

router.use('/chaptes/:book_id', function(req, res, next) {
	var book_id = req.params.book_id;
	BookContentModel.find({book_id:book_id},{content:0},function(err,chaptes){
		res.render('books/dir', { chaptes: chaptes,book_id: req.params.book_id});
	});
});

router.use('/read/:book_id', function(req, res, next) {
	getOpenid(req,res,read_chapter);
});


router.use('/share/:book_id',function(req, res, next){
	var code = req.query.code;
	var book_id = req.params.book_id;
	if(req.session['user_share_'+book_id]){
		res.render('books/share');
		return;
	}
	if(!code){
		var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+book_wechat_conf["new"].appid+"&redirect_uri="+encodeURIComponent('http://'+req.hostname+req.originalUrl)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
		res.redirect(url);
	}else{
		var api_url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+book_wechat_conf["new"].appid+"&secret="+book_wechat_conf["new"].appsecret+"&code="+code+"&grant_type=authorization_code";
		request(api_url,function(err,response,body){
			var openid = body.openid;
			console.log(body);
			WechatUtil.getQr(book_wechat_conf["new"].code,openid,req.params.book_id,function(err,qr_url){
				ImageUtil.getQRImg(qr_url,function(qr_name){
					req.session['user_share_'+req.params.book_id] = qr_name;
					res.render('books/share',{share_img:qr_name});
				});
			});
			
		});
	}
});

router.use('/getwx/:book_id',function(req, res, next){
});


//待开发
function getOpenid(req,res,callback){
	var book_id = req.params.book_id;
	var openid = req.session.openid;
	var code = req.query.code;
	if(!openid){
		if(!code){
			var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+book_wechat_conf[book_id].appid+"&redirect_uri="+encodeURIComponent('http://'+req.hostname+req.originalUrl)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
			res.redirect(url);
		}else{
			var api_url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+book_wechat_conf[book_id].appid+"&secret="+book_wechat_conf[book_id].appsecret+"&code="+code+"&grant_type=authorization_code";
			request(api_url,function(err,response,body){
				req.session.openid = body.openid;
				UserModel.findOne({openid:body.openid},['openid'],function(err,user){

				});
				callback(req,res);
			});
		}
	}else{
		callback(req,res);
	}
}

function showQr(req,res){
	
	
	/*
	var openid = req.session.openid;
	var book_id = req.params.book_id
	async.waterfall([
			function(callback){
				console.log(openid);
				UserModel.findOne({openid:openid},'code',function(error,user){
					if(!user){
						return;	
					}
					callback(null,user.code);
				});
			},
			function(code,callback){
				//WechatUtil.getQr(code,openid,book_id,callback);
			}
		],function(err,result){
			console.log(err);
			res.send(result);
	});
	*/
}

function read_chapter(req,res){
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	var chapte_id = req.query.chapte_id;
	BookContentModel.findOne({book_id:book_id,chapte_id:chapte_id},function(err,chapte){
		if(chapte.index >10 ){
			var client = WechatUtil.getClient(book_wechat_conf[book_id].code);
			client.getUser(openid,function(error,result){
				if(result.subscribe == 0){
					//关注公众号页面

				}else{
					if(chapte.index<=20){

						res.render('books/content', { chapte: chapte});	
					}else{
						//判断分享公众号
						res.redirect('/books/share/'+book_id);
					}
					
				}
			});
		}else{
			res.render('books/content', { chapte: chapte});
		}
	});
}



module.exports = router;
