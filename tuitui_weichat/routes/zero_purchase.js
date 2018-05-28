var weichat_conf = require('../conf/weichat.json');
var WechatAPI = require('wechat-api');
var WechatUtil = require('../util/wechat_get.js');
var ImageUtil = require('../util/image_util.js');
var weichat_apis = {};
var mem = require('../util/mem.js');

function purchase(openid, config, message,res){
	var text = message.Content.trim();
	if(text == '0'){
		var str = 'Duang! 您的推⼴海报已⽣成！\r\n现在可以开始参与了\r\n分享出去，获得18位好友关注即可领取\r\n《24K⾦箔玫瑰花束》，有⼈关注会有信息提示您的。\r\n'
				+'（完成后联系客服领取）\r\n⽬前关注⼈数:0 还需⼈数:18\r\n(全程免费+包邮+不花⼀分钱)'
		res.reply(str);
		get_img(openid, config);
	}else{
		res.reply('')
	}
}

async function get_img(openid, config){
	var client = new WechatAPI(config.appid, config.appsecret);
	var content = JSON.stringify({type:'0_shop',book:book_id});
	var ticket = await mem.get(content);
	if(!ticket){
		ticket = await get_qr(client,content);
	}
	var qr_name = await img_compose(ticket);

}

async function get_qr(client,content){
	return await new Promise((resolve, reject)=>{
		client.createTmpQRCode(content,2592000,function(err,reslut){
			var ticket1=   mem.set(content,reslut.ticket,2592000)
			var content1=  mem.set(reslut.ticket,content,2592000)
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

async function send_img(client,qr_name){
	var url = __dirname + '/../public/qr_image/' + qr_name
    client.uploadMedia(url, 'image', function (cerror, result) {
        if (result) {
            console.log('------发送图片-----')
            client.sendImage(openid, result.media_id, function (err, res) {
                if (err) {
                    console.log(err, '----------------err')
                }
            })
        } else {
            console.log(cerror, '-----------------cerror')
        }
    })
}

function subscribe(openid, config, message,res){
	res.reply('欢迎关注💪\r\n完成如下任务可以免费领取的爆款商品！')
}


module.exports.purchase = purchase;
module.exports.subscribe = subscribe;