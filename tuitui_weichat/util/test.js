var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

function test() {
    memcached.delete('qr_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    memcached.delete('user_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    memcached.delete(JSON.stringify({openid:'o3qBK0QX8pKSVxlehps3GSL18NXo'}), function (err, qr) {
    })

}
test()

module.exports.test = test

