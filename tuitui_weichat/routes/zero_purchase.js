var weichat_conf = require('../conf/weichat.json');
var zero_conf = require('../conf/zero.json');
var WechatAPI = require('wechat-api');
var WechatUtil = require('../util/wechat_get.js');
var ImageUtil = require('../util/image_util.js');
var weichat_apis = {};
var mem = require('../util/mem.js');
var ZeroAuthorityModel = require('../model/ZeroAuthority.js');
var moment = require('moment');


function purchase(openid, config, message,res){
	var str = zero_conf.text;
	if(res){
		res.reply(str);
	}
	get_img(openid, config);
	
}
async function get_img(openid, config){
	console.log('----- 生成图片 -----')
	if (!weichat_apis[config.code]) {
        weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
    }
    client = weichat_apis[config.code];
	var content = JSON.stringify({type:'0_shop',openid:openid});
	var ticket = await mem.get(content);
	if(!ticket){
		ticket = await get_qr(client,content);
	}
	var qr_name = await img_compose(ticket);
	var res = send_img(client,openid,qr_name);
}

async function get_qr(client,content){
	return await new Promise((resolve, reject)=>{
		client.createTmpQRCode(content,2592000,function(err,reslut){
			var ticket1=   mem.set(content,reslut.ticket,2592000)
			console.log(ticket1);
			var content1=  mem.set(reslut.ticket,content,2592000)
			console.log(ticket1);
			return resolve(reslut.ticket);
		});
	});
}

async function img_compose(ticket){
	return await new Promise((resolve, reject)=>{
		ImageUtil.getZeroImg(ticket,function(qr_name){
			return resolve(qr_name);
		});
	});
}

async function send_img(client,openid,qr_name){
	return await new Promise((resolve, reject)=>{
		var media_id = mem.get('media_zero_'+qr_name);
		if(!media_id){
			client.sendImage(openid, media_id, function (err, res) {
                if (err) {
                    console.log(err, '----------------err')
                }
                console.log('-------发送图片----')
                resolve(1)
            })
		}else{
			var url = __dirname + '/../public/qr_image/' + qr_name;
			client.uploadMedia(url, 'image', function (cerror, result) {
		        if (result) {
		            console.log('------上传图片-----') 
		            var value = mem.set('media_zero_'+qr_name,result.media_id,7*24*60*60);
		        	console.log('-------mem-----set----'+value);
		            client.sendImage(openid, result.media_id, function (err, res1) {
		                if (err) {
		                    console.log(err, '----------------err')
		                }
		                console.log('-------发送图片----')
		                resolve(1)
		            })
		        } else {
		            console.log(cerror, '-----------------cerror')
		        }
		        
		        
		    });
		}
    });
}

function subscribe(openid, config, message,res){
	res.reply('欢迎关注💪\r\n完成如下任务可以免费领取的爆款商品！')
	var ticket = message.Ticket;
	luoji(openid,config,ticket)
}

async function luoji(openid,config,ticket){
	var content = await mem.get(ticket);
	var str = zero_conf.text;
	if (!weichat_apis[config.code]) {
        weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
    }
    var api = weichat_apis[config.code];
    api.sendText(openid,str,function(err,result){
    	if (err) {
	            console.log(err, '----------------err')
	        }
	    console.log('----- 发送文字 -----')
    })
	get_img(openid, config);
    if(!content){
        return;
    }
	var obj = JSON.parse(content);
	var auth = await ZeroAuthorityModel.findOne({openid: obj.openid,action:zero_conf.index});
	if(!auth){
		auth = new ZeroAuthorityModel({
			openid:obj.openid,
			code:config.code,
			action:zero_conf.index,
			invitees:[openid]
		});
		auth.save(function(err){
		})
		send_message(auth,config);
	}else{
		ZeroAuthorityModel.findOneAndUpdate({
	        openid: obj.openid,
	        action:zero_conf.index
	    }, {$addToSet: {invitees: openid}}, {upsert: true, new: true}, function (err, auth) {
	        send_message(auth,config);
	    });
	}	
}

function send_message(auth,config){
	if (!weichat_apis[config.code]) {
        weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
    }
	var api = weichat_apis[config.code];
	var proc = auth.invitees.length;
	if(proc< zero_conf.total){
		var str = zero_conf.message.replace(/proc/g,''+proc).replace('date',moment(auth.updateAt).format('YYYY-MM-DD h:mm:ss'))
					.replace('total',''+zero_conf.total).replace('need',''+parseInt(zero_conf.total-proc))
		api.sendText(auth.openid,str,function (err, result) {
	        if(err){
	       		console.log(err)
	        }
	    });
	}else if(proc == zero_conf.total){
		api.sendImage(auth.openid, zero_conf.complete_media, function (err, res) {
	        if (err) {
	            console.log(err, '----------------err')
	        }
	    });
	}
}

setTimeout(function(){
	weichat_apis = {};
},15*60*1000)

module.exports.purchase = purchase;
module.exports.subscribe = subscribe;