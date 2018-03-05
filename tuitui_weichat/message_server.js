var socket = require('socket.io')
var WechatAPI = require('wechat-api');
var weichat_conf = require('./conf/weichat.json');

Array.prototype.contains = function(obj) {   
  var i = this.length;   
  while (i--) {   
    if (this[i] === obj) {   
      return i;  // 返回的这个 i 就是元素的索引下标，  
    }   
  }   
  return false;   
}

var MessageServer = function(server){
	this.instance = null;
	this.server = server;
	this.io = null;
	this.sockets = {};
	this.socket_ids = [];
	this.init_io(server,this);
}

MessageServer.getInstance = function(server) {
    if (!this.instance) {
        this.instance = new MessageServer(server);
    }
    return this.instance;
};


MessageServer.prototype.init_io = function(server,self) {
	self.io = socket.listen(server);
	self.io.on('connection', function (socket) {
		console.log('connection')
		self.sockets[socket.id] = socket;
		self.socket_ids.push(socket.id);
		socket.on('disconnect', function(){
		    console.log('user disconnected');
		    delete self.sockets[socket.id];
		    self.socket_ids.splice(self.socket_ids.contains('c'),1)
		});

		socket.on('token',function(msg){
			msg = JSON.parse(msg);
			var config = weichat_conf[parseInt(msg.code)];
			var str ='【'+msg.title+'】\r\n ━┉┉┉┉∞┉┉┉┉━\r\n☞ 原价:'+msg.price+'元\r\n☞ 优惠:'+msg.tkCommFee+'元\r\n'+
				 '☞ 口令:'+msg.token+'\r\n☞ 返利 :'+ (0.3*msg.couponAmount).toFixed(2) +'元 \r\n━┉┉┉┉∞┉┉┉┉━\r\n'+
				'◇ ◇ ◇   下单步骤◇ ◇ ◇\r\n 1. 按复制本信息打开淘宝下单\r\n 2.下单后将订单号发送给我\r\n[须知]:商品可使淘币进抵扣或使用其他店铺优惠 \r\n━┉┉┉┉∞┉┉┉┉━'
			var client = new WechatAPI(config.appid, config.appsecret);
			client.sendText(msg.openid, str, function(err,result){
				console.log(err);
			});
		});

	});
}

MessageServer.prototype.req_token = function(data){
	var index = parseInt(Math.random()*this.socket_ids.length);
	var key = this.socket_ids[index];
	this.sockets[key].emit('getToken',JSON.stringify(data));
}



module.exports = MessageServer