
TopClient = require('../util/taobaoke/lib/api/topClient.js').TopClient;

var client = new TopClient({
    'appkey':'24808252',
    'appsecret':'25394001ed7c0f2aff6cb31750e865f0',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});
 
client.execute('taobao.tbk.rebate.order.get', {
    'fields':'tb_trade_parent_id,tb_trade_id,num_iid,item_title,item_num,price,pay_price,seller_nick,seller_shop_title,commission,commission_rate,unid,create_time,earning_time',
    'start_time':'2015-03-05 13:52:08',
    'span':'600',
    'page_no':'1',
    'page_size':'20'
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
})