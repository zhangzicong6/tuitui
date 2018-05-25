var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

module.exports.getContent = function (ticket) {
    return new Promise((resolve, reject) => {
        console.log(ticket, '-----------ticket1')
        memcached.get('user_' + ticket, function (err, content) {
            console.log(content, '-----------------content1')
            resolve(content)
        });
    })
}

module.exports.timeContent = function (ticket) {
    return new Promise((resolve, reject) => {
        console.log(ticket, '-----------usertime')
        memcached.get('usertime_' + ticket, function (err, content) {
            console.log(content, '-----------------aaa')
            resolve(content)
        });
    })
}

