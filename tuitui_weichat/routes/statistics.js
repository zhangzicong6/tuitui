var express = require('express');
var router = express.Router();
var UserModel = require('../model/User.js');
var weichat_conf = require('../conf/weichat.json');
var async = require('async');
var mem = require('../util/mem');

router.get('/all',function (req,res,next) {
	var codes= [];
	for (var key in weichat_conf) {
		codes.push(weichat_conf[key]);
	}
	var today = new Date().setHours(0, 0, 0, 0);
	var arr =[]
	async.each(codes,function(obj_item,callback){
		async.parallel([
				function(cb){
					UserModel.count({code:obj_item.code,subscribe_time:{$gte:today}},function(err,count){
						cb(err,count)
					});
				},
				function(cb){
					UserModel.count({code:obj_item.code,subscribe_time:{$gte:today},subscribe_flag:false},function(err,count){
						cb(err,count)
					});
				}
			],function(e,rs){
				var obj ={
					subscribe_count : rs[0],
					unsubscribe_count : rs[1],
					growth : rs[0]-rs[1],
					code : obj_item.code,
					name : obj_item.name,
			}
			arr.push(obj)
			console.log(err)
			callback(null)
		})	
	},function(error){
		res.send(arr)
	})
})

router.get('/get_code', async (ctx, next) => {
	var codes= [];
	for (var key in weichat_conf) {
		codes.push(weichat_conf[key]);
	}
  	res.send({codes:codes})
})

router.get('/detail/:code',function(req,res,next){
	var code = req.params.code;
	mem.get('statistics_detail_'+code).then(function(value){
		if(value){
			res.send({data:JSON.parse(value)})
		}else{
			var item = weichat_conf[code];
			var space = 15*60*1000;
			var times= []
			var now = Date.now();
			var today = new Date().setHours(0, 0, 0, 0);
			var tmp_time = today;
			while(tmp_time<now){
				var obj= {
					start : tmp_time,
					end : tmp_time+space
				}
				times.push(obj)
				tmp_time+=space;
			}
			times.reverse()
			var arr=[];
			var result={};
			async.parallel([
				function(cb){
					UserModel.count({code:code,subscribe_time:{$gte:today}},function(err,count){
						cb(err,count)
					});
				},
				function(cb){
					UserModel.count({code:code,subscribe_time:{$gte:today},subscribe_flag:false},function(err,count){
						cb(err,count)
					});
				}
			],function(e,rs){
				result ={
					subscribe_count : rs[0],
					unsubscribe_count : rs[1],
					growth : rs[0]-rs[1],
					code : item.code,
					name : item.name,
				}
				async.each(times,function(time_obj,callback){
					async.parallel([
							function(cb){
								UserModel.count({code:item.code,subscribe_time:{$gte:time_obj.start,$lt:time_obj.end}},function(err,count){
									cb(err,count)
								});
							},
							function(cb){
								UserModel.count({code:item.code,subscribe_time:{$gte:today},unsubscribe_time:{$gte:time_obj.start,$lt:time_obj.end}},function(err,count){
									cb(err,count)
								});
							}
						],function(err,ress){
							var obj={
								start: time_obj.start,
								end : time_obj.end,
								subscribe_count : ress[0],
							    unsubscribe_count : ress[1],
							    growth : ress[0]-ress[1]
							}
							arr.push(obj)
							callback(null)
						})
				},function(error){
					result.list= arr;
					mem.set('statistics_detail_'+code,JSON.stringify(result),5*60).then(function(){
					})
					res.send({data:result});
				});
			});
		}
	})
	
})

module.exports = router;
