var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

module.exports.getContent = function (ticket) {
    return new Promise((resolve, reject) => {
        memcached.get(ticket, function (err, content) {
            resolve(content)
        });
    })
}
