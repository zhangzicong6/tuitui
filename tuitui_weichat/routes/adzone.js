var express = require('express');
var router = express.Router();


router.get('/getjs/:time.js', function(req, res, next) {
  res.render('adzone/mew_js', { code: '￥Tbzf0Kk0SQZ￥',text:'【现货】土耳其恶魔之眼-小麋人原创手工S925纯银耳环（不过敏），精致复古，耐看百搭~￥26.8元 【包邮】' });
});

module.exports = router;
