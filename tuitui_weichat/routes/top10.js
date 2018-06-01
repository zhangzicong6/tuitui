var express = require('express');
var router = express.Router();
var User = require('../model/BaoKuan.js');
var TaobaoUtil = require('../util/taobaoke_util.js');

var getByConditions = function(wherestr,callback){
    User.find(wherestr, function(err, res){
        if (err) {
        	console.log(111)
            console.log("Error:" + err);
        }
        else {
            console.log("Res:成功");
            callback(res)
        }
    })
}

router.get('/find', function(req, res, next) {
	var wherestr = {token:{$ne:null},class:req.query.class};
	getByConditions(wherestr,function(data){
        if (data) {
        	res.send({success:"成功",data:data})
        }
	})
});


router.post('/get_one',function(req,res,next){
    var obj = {
        key : req.body.key,
        class : req.body.class,
        url : req.body.url
    }
    TaobaoUtil.get_baokuang(obj);
    res.send({code:1,message:"success"});
})


module.exports = router;