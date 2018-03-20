var express = require('express');
var router = express.Router();
var BookContentModel = require('../model/BookContent.js');
var BookModel = require('../model/Book.js');
var UserReadModel = require('../model/UserRead.js');
var UserModel = require('../model/User.js');
var UserBookAuthorityModel = require('../model/UserBookAuthority.js');
var WechatUtil =require('../util/wechat_get.js');
var ImageUtil =require('../util/image_util.js');
var book_wechat_conf = require('../conf/book_wechat.json');
var WechatAPI = require('wechat-api');
var Wechat = require('wechat-jssdk');
var FileStore = require('wechat-jssdk').FileStore;
var request = require('request');
var async = require('async');


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

router.use('/continue/:book_id',function(req, res, next){
	getOpenid(req,res,read_chapter);
});

router.use('/read/:book_id', function(req, res, next) {
	getOpenid(req,res,read_continue);
});


router.use('/share/:book_id',function(req, res, next){
	var book_id = req.params.book_id;
	WechatUtil.getQr(book_wechat_conf[book_id].code,'o3qBK0RXH4BlFLEIksKOJEzx08og',book_id,function(err,tiket){
		ImageUtil.getQRImg(tiket,function(qr_name){
			req.session['user_share_'+req.params.book_id] = qr_name;
			res.render('books/share',{share_img:qr_name,book_id:book_id});
		});
	});
	//getOpenid(req,res,showQr)
});

router.use('/getwx/:book_id',function(req, res, next){
	var conf = book_wechat_conf[req.params.book_id];
	var wx = new Wechat({
	  "wechatToken": conf.token,
	  "appId": conf.appid,
	  "appSecret": conf.appsecret,
	  "store": new FileStore({
		  fileStorePath: './wx/wechat-'+conf.code+'-info.json', 
		})
	});
	wx.jssdk.getSignature(req.query.url).then(function(signatureDate) {
		signatureDate.appId = conf.appid;
	    res.json(signatureDate);
	});
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
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	WechatUtil.getQr(book_wechat_conf[book_id].code,openid,book_id,function(err,tiket){
		ImageUtil.getQRImg(tiket,function(qr_name){
			req.session['user_share_'+req.params.book_id] = qr_name;
			res.render('books/share',{share_img:qr_name,book_id:book_id});
		});
	});
}

function read_continue(req,res){
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	UserReadModel.findOne({book_id:book_id,openid:openid},function(error,read){
		if(!read){
			BookContentModel.findOne({book_id:book_id,index:1},function(err,chapte){
				return res.redirect('/books/read/'+book_id+'?chapte_id='+chapte.chapte_id);
			});
		}else{
			return res.redirect('/books/read/'+book_id+'?chapte_id='+read.chapte_id);
		}
	});
}

function read_chapter(req,res){
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	var chapte_id = req.query.chapte_id;
	BookContentModel.findOne({book_id:book_id,chapte_id:chapte_id},function(err,chapte){
		UserReadModel.findOneAndUpdate({book_id:book_id,openid:openid},
			{$set:{book_id:book_id,openid:openid,chapte_id:chapte_id}},
			{upsert:true,rawResult:true},function(err,read){
				if(error){
					console.log(err);
				}
			});
		if(chapte.index >10 ){
			check10V(chapte,req,res,function(result){
				if(result){
					check20V(chapte,req,res);
				}
			});
		}else{
			res.render('books/content', { chapte: chapte});
		}
	});
}

function check10V(chapte,req,res,next){
	var user_sub = req.session.user_sub;
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	if(user_sub){
		if(chapte.index<=20){
			res.render('books/content', { chapte: chapte});
			next(null);	
		}else{
			next('1');
		}
		return;
	}
	var client = WechatUtil.getClient(book_wechat_conf[book_id].code);
	client.getUser(openid,function(error,result){
		if(result.subscribe == 0){
			//关注公众号页面
			res.render('books/subscribe',{});
			next(null);
		}else{
			req.session.user_sub = '1';
			UserBookAuthorityModel.findOne({book_id:book_id,openid:openid},function(err,auth){
				if(!auth){
					UserBookAuthorityModel.create({
						book_id:book_id,
						openid:openid,
						can_read:20
					});
				}
				if(chapte.index<=20){
					res.render('books/content', { chapte: chapte});	
					next(null);
				}else{
					next('1');
				}
			});
		}
	});
}

function check20V(chapte,req,res){
	var openid = req.session.openid;
	var book_id = req.params.book_id;
	UserBookAuthorityModel.findOne({openid:openid,book_id:book_id},function(err,auth){
		if(chapte.index<=auth.can_read){
			res.render('books/content', { chapte: chapte});
		}else{
			if(auth.can_read<=20){
				res.redirect('books/share/'+book_id);
			}else{
				res.render('books/content', { chapte: chapte});	
			}
		}
	});
}


module.exports = router;