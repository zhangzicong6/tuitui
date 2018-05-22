var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var crypto = require('crypto');
var taobao_apiClient = require('../util/taobaoke/index.js').ApiClient;
var weichat_conf = require('../conf/weichat.json');
var book_wechat_conf = require('../conf/book_wechat.json');
var taobao_conf = require('../conf/taobao.json');
var TaobaoUtil = require('../util/taobaoke_util.js');
var async = require('async');
var WechatUtil = require('../util/wechat_get.js');
var ImageUtil = require('../util/image_util.js');

var TokenModel = require('../model/Token.js');
var UserModel = require('../model/User.js');
var UserOrderModel = require('../model/UserOrder.js');
var AddFreeOrderModel = require('../model/AddFreeOrder.js');
var BookModel = require('../model/Book.js');
var UserBookAuthorityModel = require('../model/UserBookAuthority.js');
var UserActionMiaoShaModel = require('../model/UserActionMiaoSha.js');
var UserWaitMessageModel = require('../model/UserWaitMessage.js');

var MessageServer = require('../message_server.js');
var weichat_apis = {};

var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

var send_codes = require('../conf/proj.json').send_wechat;


router.use('/:code', function (request, response, next_fun) {
    var config = weichat_conf[request.params.code];
    if (!request.query.openid) {
        //console.log('validate');
        validate(request, response);
    } else {
        wechat(config, function (req, res, next) {
            var message = req.weixin;
            var openid = message.FromUserName;
            getUserInfo(openid, config, message, request, req, res, function (openid, config, message, request, req, res) {
                if (message.MsgType === 'text') {
                    if (send_codes.indexOf('' + request.params.code) != -1) {
                        update_sendMessage(openid)
                    }
                    var text = message.Content.trim();
                    if (text === '帮助') {
                        res.reply('文字教程：http://t.cn/Rlz6JkV\r\n视频教程：http://t.cn/RK37GMb\r\n\r\n———— 省钱攻略 ———— \r\n1.打开手机淘宝，选中购买的产品。\r\n' +
                            '2.点击商品名右侧的“分享(有赏)”，分享给我。\r\n3.复制我返回的信息。\r\n4.打开淘宝放入购物车或付款购买。\r\n注:不可使用淘金币进行抵扣\r\n' +
                            '5.点击查看订单，把订单号发给我获得返利。\r\n———— 常用指令———— \r\n账户信息请回复:个人信息\r\n订单查询请回复:订单\r\n余额提现请回复:提现 \r\n详细教程请回复:帮助');
                    } else if (text === '订单') {
                        getOrders(openid, res);
                    } else if (text === '个人信息') {
                        getUser(openid, res);
                    } else if (text === '测试个人信息' && request.params.code == 1) {
                        new_getUser(openid, res);
                    } else if (text === '邀请好友') {
                        invite(config, request.params.code, openid, res);
                    } else if (text === '提现') {
                        cash(request.params.code, openid, res);
                    } else if (text === '0' || text === '1' || text === '2') {
                        if (request.params.code == '8' || request.params.code == '1') {
                            saveActionMiaoSha(openid, text, request.params.code, res);
                        } else {
                            res.reply('');
                        }
                    } else if (/^\d{5,8}$/.test(text)) {
                        getCode(openid, text, res);
                    } else if (/^\d{15,20}$/.test(text)) {
                        setOrder(openid, text, res);
                    } else if (/^\d{9,14}$/.test(text) || /^\d{21,}$/.test(text)) {
                        res.reply('无效订单号，请您检查订单号!');
                    } else if (text.search('搜索') == 0) {
                        getSearch(config, openid, text, res);
                    } else if (text.search('【') != -1) {
                        getTaobaoke_byCode(config, openid, text, res);
                    } else if (/^[\s\S]{10,30}$/.test(text)) {
                        getTaobaoke_byCode(config, openid, text, res);
                    } else if (text == '提现测试') {
                        res.reply('<a href="http://www.rrdtjj.top/alipay/redirect/' + request.params.code + '">点击链接提现</a>')
                    } else if (text == '测试openid') {
                        res.reply(openid);
                    } else {
                        res.reply('')
                    }
                } else if (message.MsgType === 'event') {
                    console.log(message, '----------------message')
                    if (message.Event === 'subscribe') {
                        var code_list = book_wechat_conf.book_wechat_list;
                        if (code_list.indexOf(request.params.code) == -1) {
                            if (config.sub_replay == 0) {
                                res.reply('');
                            } else {
                                res.reply('省钱助手欢迎您！\r\n回复10000或好友邀请码领红包!\r\n一一一一🍒使用攻略一一一一\r\n<搜索优惠>回复：搜索+商品名称\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n文字教程：http://t.cn/Rlz6JkV\r\n视频教程：http://t.cn/RK37GMb\r\n账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现\r\n详细教程请回复：帮助\r\n')
                            }
                        } else if (request.params.code == 1 && message.Ticket) {
                            bind_user(openid, request.params.code, message.Ticket, res)
                        } else {
                            var book_id = book_wechat_conf.book_wechat_map[request.params.code];
                            replay_book(book_id, message, res);
                            if (message.Ticket) {
                                getXiaoshuo(message, request.params.code);
                            }
                        }

                        /*res.reply('美淘日记欢迎您！\r\n回复10000或好友邀请码领红包!\r\n一一一一使用攻略一一一一\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n图文教程：http://t.cn/RETghsf\r\n一一一一🍒常用指令一一一一\r\n'+
                         '账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现\r\n详细教程请回复：帮助');*/
                    } else if (message.Event.toLowerCase() == 'click') {
                        if (message.EventKey == 'KEY_GERENZHONGXIN') {
                            res.reply('省钱助手欢迎您！\r\n回复10000或好友邀请码领红包!\r\n一一一一🍒使用攻略一一一一\r\n<搜索优惠>回复：搜索+商品名称\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n文字教程：http://t.cn/Rlz6JkV\r\n视频教程：http://t.cn/RK37GMb\r\n账户信息请回复：个人信息\r\n订单查询请回复：订单\r\n余额提现请回复：提现\r\n详细教程请回复：帮助\r\n')
                        } else if (message.EventKey == 'KEY_MEITAO') {
                            if (request.params.code == 3) {
                                res.reply({
                                    type: "image",
                                    content: {
                                        mediaId: 'Za0yRodBTW-tqxBDZL73BHzOCht6lW7M__gbthmFqSo'
                                    }
                                });
                            } else {
                                res.reply('');
                            }
                        } else if (message.EventKey == 'KEY_HEZUO') {
                            if (request.params.code == 3) {
                                res.reply({
                                    type: "image",
                                    content: {
                                        mediaId: 'Za0yRodBTW-tqxBDZL73BAOXP3XOsqh2tcFKwc3kkyc'
                                    }
                                });
                            } else {
                                res.reply('');
                            }
                        } else {
                            res.reply('');
                        }
                    } else {
                        res.reply('');
                    }
                } else {
                    res.reply('');
                }
            });
        })(request, response, next_fun);
    }
});

function update_sendMessage(openid) {
    UserWaitMessageModel.findOne({openid: openid}, function (err, msg) {
        if (err || !msg) {
            return
        }
        msg.user_status = msg.status;
        msg.action_time = Date.now();
        msg.save();
    });
}

function getSearch(config, openid, text, res) {
    var key = text.substr(2, text.length).trim();
    var url = 'http://mingxingwuwubao.m.jswoge.top/index/index/sort/8/all_hide/1/key/' + encodeURIComponent(key);
    var str = '点击下方链接查看【' + key + '】给力优惠券！\r\n'
        + '━┉┉┉┉∞┉┉┉┉━\r\n'
        + '<a href="' + url + '">点我查看优惠券</a>\r\n'
        + '━┉┉┉┉∞┉┉┉┉━\r\n'
        + '买完记得把订单号码发给我领取“返利”哦！';
    res.reply(str);
}

function saveActionMiaoSha(openid, text, code, res) {
    var replay_number = parseInt(text);
    var miaosha = {openid: openid, replay_number: replay_number, code: code};
    UserActionMiaoShaModel.findOneAndUpdate(miaosha, miaosha, {upsert: true, rawResult: true}, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
    res.reply('');
}

function replay_book(book_id, message, res) {
    var conf = book_wechat_conf['' + book_id];
    var openid = message.FromUserName;
    UserBookAuthorityModel.findOne({book_id: book_id, openid: openid}, function (err, auth) {
        if (!auth) {
            UserBookAuthorityModel.create({
                book_id: book_id,
                openid: openid,
                can_read: 20
            }, function (error, res) {
                console.log(res);
            });
        }
    });
    if (message.Ticket) {
        var str = '欢迎关注「' + conf.name + '」，为您推荐超赞的言情小说：\r\n\r\n';
        str += '<a href="http://www.rrdtjj.top/books/continue/' + conf.book_id + '">《' + conf.bookname + '》</a>\r\n\r\n';
        for (var i = 0; i < conf.other_books.length; i++) {
            var book = conf.other_books[i];
            str += '<a href="http://www.rrdtjj.top/books/continue/' + book.book_id + '">《' + book.bookname + '》</a>\r\n\r\n'
        }
        res.reply(str);
    } else {
        var str = '欢迎关注「' + conf.name + '」，您正在阅读《' + conf.bookname + '》\r\n';
        str += '<a href="http://www.rrdtjj.top/books/continue/' + conf.book_id + '">点我继续阅读</a>\r\n\r\n\r\n';
        str += '猜您喜欢：\r\n';
        for (var i = 0; i < conf.other_books.length; i++) {
            var book = conf.other_books[i];
            str += '<a href="http://www.rrdtjj.top/books/continue/' + book.book_id + '">《' + book.bookname + '》</a>\r\n\r\n'
        }
        res.reply(str);
    }
}

function getXiaoshuo(message, code) {
    memcached.get(message.Ticket, function (err, content) {

        if (content) {
            var obj = JSON.parse(content);
            UserBookAuthorityModel.findOneAndUpdate({
                book_id: obj.book,
                openid: obj.openid
            }, {$addToSet: {invitees: message.FromUserName}}, {upsert: true, new: true}, function (err, auth) {
                if (auth.invitees.length == 2) {
                    sendBookMessage(auth, code);
                }
                if (auth.invitees.length == 5) {
                    auth.can_read = 30;
                    auth.save(function (error) {
                        console.log(error);
                    });
                    sendBookMessage(auth, code);
                }
            });
        }
    });

}


function sendBookMessage(auth, code) {
    var config = weichat_conf[code];

    var client = new WechatAPI(config.appid, config.appsecret);
    var str = '';
    if (auth.invitees.length < 5) {
        str += '您参与的活动有新进展了\r\n\r\n活动名称：邀请好友解锁小说\r\n活动进度：已完成' + auth.invitees.length + '/5\r\n';
        str += '目前关注人数：' + auth.invitees.length + '\r\n还需关注人数：' + (5 - auth.invitees.length);
    } else {
        str += '您参与的活动有新进展了\r\n\r\n活动名称：邀请好友解锁小说\r\n活动进度：已完成5/5\r\n';
        str += '<a href="http://www.rrdtjj.top/books/continue/' + auth.book_id + '">【点我继续阅读】</a>\r\n';
    }
    console.log('send book message to user');
    client.sendText(auth.openid, str, function (err, result) {
        console.log(err);
    });
}

function validate(req, res) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var token = 'mingxingshuo';

    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    console.log(echostr);
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        res.send(echostr);
    } else {
        res.send("error");
    }
}


function getCode(openid, text, res) {
    async.waterfall([
        function (callback) {
            AddFreeOrderModel.findOne({openid: openid, type: 2}, function (error, result) {
                if (result) {
                    callback('你已绑定邀请码' + result.auction + ',请不要重复绑定！');
                } else {
                    var cash = parseFloat((Math.random() * 0.3 + 0.5).toFixed(2));
                    callback(null, cash);
                }
            });
        },
        function (cash, callback) {
            var auction = parseInt(text);
            if (auction != 10000) {
                async.waterfall([
                    function (callback) {
                        UserModel.findOne({auction: auction}, function (error, user) {
                            if (!user) {
                                return;
                            }
                            callback(error, user);
                        });
                    }, function (user, callback) {
                        var bind_cash = parseFloat((Math.random() * 0.2 + 0.3).toFixed(2));
                        AddFreeOrderModel.create({
                            openid: user.openid,
                            type: 3,
                            cash: bind_cash,
                            auction: user.auction
                        });
                        user.current_balance += bind_cash;
                        user.save();
                        var conf = weichat_conf[user.code];
                        console.log(conf);
                        var api = WechatAPI(conf.appid, conf.appsecret);
                        console.log(user);
                        var str = '你邀请的好友，已经绑定你的邀请码，账户金额为你增加' + bind_cash + '元，你现在的账户金额为' + user.current_balance + '元';
                        api.sendText(user.openid, str, function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(res);
                            callback(null);
                        });
                    }
                ], function (error, result) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            AddFreeOrderModel.create({openid: openid, type: 2, cash: cash, auction: auction});
            UserModel.findOneAndUpdate({openid: openid}, {$inc: {current_balance: cash}}, function (error, user) {
                callback(null, cash, user);
            });
        }
    ], function (error, cash, user) {
        if (error) {
            return res.reply(error);
        }
        return res.reply('赠送您【' + cash.toFixed(2) + '】元\r\n账户余额：【' + (user.current_balance + cash).toFixed(2) + '】元\r\n' + 'ヾ(≧▽≦*)o超过1元可提现\r\n' +
            '⼀⼀⼀⼀使⽤攻略⼀⼀⼀⼀\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n教程：http://t.cn/RETghsf');
    });
}

async function bind_user(openid, code, ticket, res) {
    let cash = parseFloat((Math.random() * 0.3 + 0.6).toFixed(2));
    let father_cash = parseFloat((Math.random() * 0.3 + 0.6).toFixed(2));
    let conf = weichat_conf[code];
    let api = WechatAPI(conf.appid, conf.appsecret);

    let type = await AddFreeOrderModel.findOne({openid: openid, type: 2})
    console.log(type, '---------------type')
    if (type) {
        return res.reply('您已绑定二维码,请不要重复绑定！');
    }
    // let content = await memcached.get(ticket)
    memcached.get(ticket, async function (err, content) {
        console.log(content, '---------------content')
        if (!content) {
            return res.replay('二维码错误')
        }
        let fatherid = JSON.parse(content).openid;
        let hostid = fatherid;
        console.log(fatherid, '---------------fatherid')
        let father = await UserModel.findOneAndUpdate({openid: fatherid}, {
            $inc: {current_balance: father_cash},
            $addToSet: {friend: openid}
        })
        console.log(father, '---------------father')
        if (!father) {
            return res.replay('二维码错误')
        }
        if (father.hostid) {
            hostid = father.hostid;
            await UserModel.findOneAndUpdate({openid: father.hostid}, {$addToSet: {friend: openid}})
        }
        let user = await UserModel.findOneAndUpdate({openid: openid}, {
            $inc: {current_balance: cash},
            $set: {fatherid: fatherid, hostid: hostid}
        })
        if (!user) {
            return res.replay('用户错误')
        }
        console.log(user, '---------------user')
        AddFreeOrderModel.create({openid: openid, type: 2, cash: cash});

        if (father.fatherid) {
            await UserModel.findOneAndUpdate({openid: father.fatherid}, {$inc: {current_balance: 0.66}})
        }
        let str = '赠送您【' + cash + '】元\r\n账户余额：【' + cash + '】元\r\n' +
            'ヾ(≧▽≦*)o超过1元可提现\r\n\r\n⼀⼀⼀⼀�使⽤攻略⼀⼀⼀⼀\r\n' +
            '<搜索优惠>回复：搜索+商品名称\r\n<指定商品优惠查询>请将淘宝商品分享给我！\r\n' +
            '⽂字教程：http://t.cn/Rlz6JkV\r\n视频教程：http://t.cn/RK37GMb'
        api.sendText(openid, str, function (err, res) {
            if (err) {
                console.log(err)
            }
        });
        let father_str = '嗨，【' + father.nickname + '】！您的朋友【' + user.nickname + '】刚刚关注我啦，您获得【' + father_cash + '】元奖励！' +
            '您的当前余额【' + father.current_balance + '】元。好友购物后，您也有返利，快去教教他吧！';
        api.sendText(father.openid, father_str, function (err, res) {
            if (err) {
                console.log(err)
            }
        });
        return;
    })
}

function cash(code, openid, res) {
    UserModel.findOne({openid: openid}, function (error, user) {
        if (!user) {
            return;
        }
        current_balance = user.current_balance;
        if (parseFloat(current_balance.toFixed(2)) < 1) {
            res.reply('您的余额为【' + current_balance.toFixed(2) + '】元，要达到【1.0】元才可以提现哦！');
        } else {
            var str = '余额超过1元，可以申请提现！\r\n━┉┉┉┉∞┉┉┉┉━┉━━\r\n' +
                '<a href="http://www.rrdtjj.top/alipay/redirect/' + code + '">点我提现</a>\r\n' +
                '━┉┉┉┉∞┉┉┉┉━┉━━\r\n申请提现后，24小时内提现到账！'
            res.reply(str);
        }
    });
}

function getUser(openid, res) {
    UserModel.findOne({openid: openid}, function (error, user) {
        if (!user.auction) {
            var query = UserModel.find({
                $or: [
                    {auction: {$ne: 0}},
                    {auction: {$ne: null}},
                ]
            }).sort({auction: -1}).limit(1);
            query.exec(function (error, tmps) {
                if (tmps.length && tmps[0].auction > 10000) {
                    user.auction = tmps[0].auction + 1;
                } else {
                    user.auction = 10000 + 1;
                }
                user.save();
            });
            sendUserMessage(openid, user, res);
        } else {
            sendUserMessage(openid, user, res);
        }
    });
}

function sendUserMessage(openid, user, res) {
    async.parallel([
        function (callback) {
            UserOrderModel.count({openid: openid, status: {$ne: 0}}, callback);
        },
        function (callback) {
            UserOrderModel.count({openid: openid, $or: [{status: -1}, {status: 3}]}, callback);
        },
        function (callback) {
            UserOrderModel.count({openid: openid, $or: [{status: 1}, {status: 2}]}, callback);
        },
    ], function (err, counts) {
        var str = '━┉┉┉┉∞┉┉┉┉━\r\n订单总数:' + counts[0] + '笔\r\n已完成数:' + counts[1] + '笔\r\n未完成数:' + counts[2] + '笔\r\n' +
            '当前余额:' + user.current_balance.toFixed(2) + '元\r\n累计提现:' + user.addup_cash.toFixed(2) + '元\r\n━┉┉┉┉∞┉┉┉┉━\r\n' +
            '个人邀请码：【' + user.auction + '】\r\n' + '◇ ◇ ◇ 温馨提醒◇ ◇ ◇ \r\n收货后，返会添加到个账户余额超过1元，输入 “提现”提现';
        //console.log(str);
        res.reply({
            content: str,
            type: 'text'
        });
    });
}


function new_getUser(openid, res) {
    UserModel.findOne({openid: openid}, function (error, user) {
        new_sendUserMessage(openid, user, res);
    });
}

function new_sendUserMessage(openid, user, res) {
    async.parallel([
        function (callback) {
            UserOrderModel.count({openid: openid, status: {$ne: 0}}, callback);
        },
        function (callback) {
            UserOrderModel.count({openid: openid, $or: [{status: -1}, {status: 3}]}, callback);
        },
        function (callback) {
            UserOrderModel.count({openid: openid, $or: [{status: 1}, {status: 2}]}, callback);
        },
    ], function (err, counts) {
        var str = '━┉┉┉┉∞┉┉┉┉━\r\n订单总数:' + counts[0] + '笔\r\n已完成数:' + counts[1] + '笔\r\n未完成数:' + counts[2] + '笔\r\n' +
            '购买返利：' + user.rebate.toFixed(2) + '元\r\n好友返利：' + user.friend_rebate.toFixed(2) + '元\r\n好友个数：' + user.friend.length + '个\r\n' +
            '有效好友：' + user.valid_friend.length + '个s\r\n当前余额:' + user.current_balance.toFixed(2) + '元\r\n累计提现:' + user.addup_cash.toFixed(2) +
            '元\r\n━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇�温馨提醒◇ ◇ ◇ \r\n收货后，返利会添加到个⼈账户余额超过1元，输⼊“提现”提现';
        //console.log(str);
        res.reply({
            content: str,
            type: 'text'
        });
    });
}

function getOrders(openid, res) {
    async.parallel([
            //并行同时执行
            function (callback) {
                UserOrderModel.count({openid: openid, status: {$ne: 0}}, callback);
            },
            function (callback) {
                var query = UserOrderModel.find({openid: openid, status: {$ne: 0}}).sort({updateAt: -1}).limit(5);
                query.exec(callback);
            }
        ],
        function (err, results) {
            orders = {};
            orders.all_count = results[0];
            orders.list = results[1];
            var str = '您共有【' + orders.all_count + '】个订单，近期订单如下:\r\n ━┉┉┉┉∞┉┉┉┉━\r\n' +
                '订单号|日 期|状 态|返 利\r\n';
            for (var i = 0; i <= orders.list.length - 1; i++) {
                var order = orders.list[i];
                str += '***' + order.order_number.substr(5, 5) + '***|' + order.create_at.substr(0, 10) + '|' + getOrderStatus(order.status) + '| ' + (order.tk_comm_fee ? order.tk_comm_fee : '-') + ' \r\n';
            }
            str += '━┉┉┉┉∞┉┉┉┉━\r\n◇ ◇ ◇   提醒◇ ◇ ◇ \r\n回复订单号才能获得返利哦! 商品点击收货后 余额超过1元输 “提现”提现。';
            //console.log(str);
            res.reply({content: str, type: 'text'});
        });
}

function getOrderStatus(status) {
    if (status == 0) {
        return '待追踪'
    } else if (status == 1) {
        return '付款'
    } else if (status == 2) {
        return '成功'
    } else if (status == 3) {
        return '结算'
    } else if (status == -1) {
        return '失效'
    }
}

function setOrder(openid, order_number, res) {
    async.waterfall([
        function (callback) {
            UserOrderModel.findOne({order_number: order_number}, function (err, uo) {
                if (uo) {
                    return callback('已绑定订单，正在跟踪订单,请耐心等候！');
                }
                callback(null);
            });
        },
        function (callback) {
            UserOrderModel.create({order_number: order_number, openid: openid, status: 0});
            callback(null);
        }
    ], function (error, result) {
        if (error) {
            res.reply(error);
        } else {
            res.reply('订单【' + order_number + '】标记成功，稍后系统将自动追踪订单！');
        }
    });
}


function getTaobaoke_byCode(config, openid, text, res) {
    //var code = text.substr(text.search(/￥[0-9a-zA-Z]{11}￥/),13);
    var title = '';
    res.reply('');
    if (text.search('【') != -1) {
        if (text.search('（') != -1) {
            title = text.split('（')[1].split('）')[0];
        } else {
            title = text.split('【')[1].split('】')[0];
        }
    } else {
        title = text;
    }

    data = {};
    data.openid = openid;
    data.code = config.code;
    data.title = title;

    var code = '';
    if (text.search(/￥[0-9a-zA-Z]{11}￥/) != -1) {
        code = text.substr(text.search(/￥[0-9a-zA-Z]{11}￥/), 13);
    }

    var str_url = '';
    if (text.search('【') != -1 && text.search('http') != -1) {
        str_url = text.split('】')[1].split(' ')[0];
    }

    if (str_url) {
        console.log('url---------------' + str_url);
        TaobaoUtil.request_taobao_url(str_url, function (err, url) {
            if (err || !url) {
                MessageServer.getInstance(null).req_title_token(data);
            } else {
                data.title = url;
                MessageServer.getInstance(null).req_title_token(data);
            }

        });

    } else if (code) {
        console.log('code---------------' + code);
        TaobaoUtil.request_taobao_token(code, function (err, url) {
            if (err || !url) {
                MessageServer.getInstance(null).req_title_token(data);
            } else {
                data.title = url;
                MessageServer.getInstance(null).req_title_token(data);
            }
        });
    } else {
        console.log('--------search title--------')
        MessageServer.getInstance(null).req_title_token(data);
    }

}

function getTaobaoke(config, openid, text, res) {
    var url = text.split('】')[1].split(' ')[0];
    TaobaoUtil.request_taobao_url(url, function (err, result) {
        if (err) {
            return res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
        }
        if (result && result.data) {
            res.reply('');
            data = result.data;
            data.openid = openid;
            data.code = config.code;
            MessageServer.getInstance(null).req_token(data);
        } else {
            res.reply("❋❋❋❋❋❋❋❋❋❋❋❋❋❋\r\n您查询的商品暂时没有优惠！\r\n❋❋❋❋❋❋❋❋❋❋❋❋❋❋");
        }
    });
}

function getUserInfo(openid, config, message, request, w_req, w_res, next) {
    //var client = new WechatAPI(config.appid, config.appsecret);
    async.waterfall([
        function (callback) {
            UserModel.findOneAndUpdate({
                openid: openid,
                code: config.code
            }, {action_time: Date.now()}, function (err, user) {
                if (!user) {
                    //console.log('无用户');
                    callback(null);
                } else {
                    callback('用户存在');
                }
            });
        },
        function (callback) {
            user = {}
            user.nickname = '';
            user.openid = openid;
            user.code = config.code;
            user.current_balance = 0;
            user.action_time = Date.now();
            UserModel.create(user, function (error) {
                if (error) console.log(error)
            });
            //console.log(user);
            callback(null, null);

        }
    ], function (err, res) {
        if (err) {
            console.log(err);
        }
        next(openid, config, message, request, w_req, w_res);
    });
}

function getAccessToken(code, callback) {
    var config = weichat_conf[code];
    if (!weichat_apis[config.code]) {
        weichat_apis[config.code] = new WechatAPI(config.appid, config.appsecret);
    }
    var client = weichat_apis[config.code];

    async.waterfall([
        function (callback) {
            TokenModel.findOne({code: config.code}, function (err, token) {
                if (!token) {
                    console.log('无token');
                    callback(null, -1, {code: config.code});
                } else if (token.expireTime <= Date.now()) {
                    callback(null, 0, token);
                } else {
                    callback(null, 1, token);
                }
            });
        },
        function (flag, token, callback) {
            if (flag === 1) {
                return callback(null, token);
            } else {
                client.getLatestToken(function (err, weichat_token) {
                    if (err) {
                        callback(err);
                    } else {
                        weichat_token.code = token.code
                        TokenModel.findOneAndUpdate({code: weichat_token.code}, {$set: weichat_token}, {
                            upsert: true,
                            rawResult: true
                        }, function (err) {
                            console.log('update');
                        });

                        return callback(null, weichat_token);
                    }
                });
            }
        },

    ], function (err, token) {
        callback(token);
    });
}

function invite(config, code, openid, user, res) {
    console.log('------------invite')
    var client = new WechatAPI(config.appid, config.appsecret);
    var str = '申请进度通知\r\n\r\n申请成功啦！\r\n审核处理⼈：管理员\r\n审核进度：申请通过\r\n-------------------------' +
        '\r\n您的专属⼆维码⽣成成功（有效期30天）。让您的好友扫码关注公号即可！您会直接收到红包奖励！' +
        '好友购物后，您会收到⼀定⽐例的返利（邀请好友多⾮常可观）！';
    client.sendText(openid, str, function (err, res) {
        if (err) {
            console.log(err)
        }
    });
    WechatUtil.getuserQr(code, openid, function (err, ticket) {
        console.log(ticket, '------------ticket')
        if (ticket) {
            UserModel.findOne({openid: openid}, function (error, user) {
                ImageUtil.getUserImg(ticket, user.nickname, user.headimgurl, function (qr_name) {
                    console.log(qr_name, '---------------qr_name')
                    client.uploadImage('http://tiexie0.top' + __dirname + qr_name, function (cerror, result) {
                        if (result) {
                            console.log(result, '-----------------result')
                            client.sendImage(openid, result.url, function (err, res) {
                                if (err) {
                                    console.log(err, '----------------err')
                                }
                            })
                        } else {
                            console.log(cerror, '-----------------cerror')
                        }
                    })
                })
            })
        }
    })
}

// 测试使用
/*router.use('/',function(request, response, next_fun){
 getTaobaoke_byCode(weichat_conf['1'],'o3qBK0RXH4BlFLEIksKOJEzx08og',
 '【遥控智能机器人玩具对话儿童男孩小胖会讲故事跳舞新威尔机械战警】http://m.tb.cn/h.WtyRn3h 点击链接，再选择浏览器打开；或复制这条信息￥cTMi0n4KTkA￥后打开👉手淘👈',
 null);
 response.send('test');
 });*/

/*getTaobaoke_byCode(weichat_conf['1'],'o3qBK0RXH4BlFLEIksKOJEzx08og',
 '【遥控智能机器人玩具对话儿童男孩小胖会讲故事跳舞新威尔机械战警】，再选择浏览器打开；或复制这条信息￥EwvM0ssydOc￥后打开👉手淘👈',
 null);*/


//getUser('o3qBK0X47Wfngfu_0dmCqSQwwtgU',weichat_conf['1']);

module.exports = router;

