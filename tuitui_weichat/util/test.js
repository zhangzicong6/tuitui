var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

function test() {
    memcached.delete('image_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    // memcached.delete('qr_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    memcached.delete('user_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    memcached.delete(JSON.stringify({openid:'o3qBK0QX8pKSVxlehps3GSL18NXo'}), function (err, qr) {
    })
    memcached.delete('image_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    // memcached.delete('qr_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    memcached.delete('user_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    })
    memcached.delete(JSON.stringify({openid:'o3qBK0RXH4BlFLEIksKOJEzx08og'}), function (err, qr) {
    })
    memcached.delete('image_gQG_7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZlhfZko3dXdkYWgxZXhVSmhyY0MAAgShawZbAwQAjScA', function (err, qr) {
    })
    // memcached.delete('qr_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    memcached.delete('user_gQG_7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZlhfZko3dXdkYWgxZXhVSmhyY0MAAgShawZbAwQAjScA', function (err, qr) {
    })
    memcached.delete(JSON.stringify({openid:'o3qBK0ZM6UHi58UK_Yy3YymzdEcc'}), function (err, qr) {
    })
}
test()

module.exports.test = test

