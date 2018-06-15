/**
 * Created by Sweven on 2018/5/30.
 */


var openid = 'o2psx1sJkLrlZhLOdztuWgu50GZU'

var WechatUtil = require('../util/wechat_get.js');
var code = "25";

function getuser() {
	var client = new WechatUtil.getClient(code);
	client.getUser(openid,function (err,data) {
		console.log('------------------');
		console.log(err);
		console.log('-------------------');
		console.log(data);
	});
}

getuser();