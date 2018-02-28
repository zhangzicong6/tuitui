require('events').EventEmitter.prototype._maxListeners = 1000;

var request = require('request');
var async = require('async');
ApiClient = require('./taobaoke/index.js').ApiClient;
TopClient = require('./taobaoke/lib/api/topClient.js').TopClient;

function request_taobao_url(url,next){
	async.waterfall([
			function(callback){
				var options = {  
					maxRedirects:15,
					url:url, 
					method:"GET",
					headers: {  
						"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
					    "Connection": "keep-alive", 
					    "Content-Type": "text/html; charset=GBK",  
					    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
					}//伪造请求头  
				};
				request(options, function (error, response, body) {
					if(error){
						return callback(error,null);
					}
					var str_html=response.body;
					var str_temp=str_html.split('var url = \'')[1];
					var str_url= str_temp.split('\'')[0];
					options.url=str_url;
					callback(null,options);
				});
			},
			function(options,callback){
				request(options,function(e, res, b){
					if(e){
						return callback(e,null);
					}
					var uri_obj = res.request.uri;
					console.log(uri_obj.protocol+'//'+uri_obj.hostname+uri_obj.path);
					var tmp_arr = uri_obj.path.split('id=')
					var tmp_str = tmp_arr[0]+'id='+tmp_arr[1].split('&')[0];
					var param_url=uri_obj.protocol+'//'+uri_obj.hostname+tmp_str;
					options.url='http://pub.alimama.com/items/search.json?q='+encodeURI(param_url);
					console.log('url : '+options.url);
					options.param_url=param_url;
					callback(null,options);
				});
			},
			function(options,callback){
				request(options,function(e, res, b){
					if(e){
						return callback(e,null);
					}
					var obj = JSON.parse(b);
					console.log(obj);
					if(obj.data.pageList && obj.data.pageList[0]){
						var tmp = obj.data.pageList[0];
						res={
							url:tmp.auctionUrl,
							data:{
								title:tmp.title,
								price:tmp.zkPrice,
								tkCommFee:tmp.tkCommFee,
								couponAmount:tmp.couponAmount,
							}
						};
					}else{
						res={
							url:options.param_url,
							error:{
								code:1,
								message:'无优惠信息'
							}
						};
					}
					callback(null,res);
				});
			},
			function(res,callback){
				taokouling(res,callback);
			}
		],function(err, results){
			next(err,results);		
	});
}


function taokouling(obj,next){
	if(obj.error){
		return next(obj.error);
	}
	var client = new TopClient({
	    'appkey': '24808252',
	    'appsecret': '25394001ed7c0f2aff6cb31750e865f0',
	    'REST_URL': 'http://gw.api.taobao.com/router/rest'
	});

	client.execute('taobao.wireless.share.tpwd.create',
	    {'tpwd_param':JSON.stringify({url:obj.url,text:obj.data.title})},
	    function (error,response) {
	        if(!error){
	        	if(response.model){
	        		obj.taokouling = response.model;
	        		next(null,obj);
	        	}else{
	        		console.log(response);
	        		next(null,obj);
	        	}
	        }else{
	            console.log(error);
	            next(error,obj);
	        }
	    }
	);
}

request_taobao_url('http://m.tb.cn/h.WuZHdva',function(error,res){
	console.log(res);
});

module.exports.request_taobao_url = request_taobao_url;