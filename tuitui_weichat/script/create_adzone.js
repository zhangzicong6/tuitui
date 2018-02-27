
TopClient = require('../util/taobaoke/lib/api/topClient.js').TopClient;

var client = new TopClient({
    'appkey':'24808252',
    'appsecret':'25394001ed7c0f2aff6cb31750e865f0',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});
 
client.execute('taobao.tbk.adzone.create', {
    'site_id':'42870375',
    'adzone_name':'微信推广位'
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
});