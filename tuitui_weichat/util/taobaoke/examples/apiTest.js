/**
 * Module dependencies.
 */

ApiClient = require('../index.js').ApiClient;

const client = new ApiClient({
    'appkey':'23404313',
    'appsecret':'1f108b360582f72126b1e92a2fc0fbaf',
    'url':'http://gw.api.taobao.com/router/rest'
});

client.execute('taobao.tbk.tpwd.create',
    {
        'text':'长度大于5个字符',
        'url':'https://detail.tmall.com/item.htm?id=548075169457&price=89-238&sourceType=item&sourceType=item',
        'logo':'https://uland.taobao.com/',
    },
    function (error,response) {
        if(!error)
            console.log(response);
        else
            console.log(error);
    }
);