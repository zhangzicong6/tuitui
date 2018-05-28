var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');
var UserModel = require('../model/User.js');
var AddFreeOrderModel = require('../model/AddFreeOrder.js');

function test() {
    // memcached.delete('image_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete('user_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete(JSON.stringify({openid:'o3qBK0QX8pKSVxlehps3GSL18NXo'}), function (err, qr) {
    // })
    // memcached.delete('image_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete('user_gQF87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydHhDdklwdXdkYWgxZnAwSWhyY1kAAgTZMwVbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete(JSON.stringify({openid:'o3qBK0RXH4BlFLEIksKOJEzx08og'}), function (err, qr) {
    // })
    // memcached.delete('image_gQG_7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZlhfZko3dXdkYWgxZXhVSmhyY0MAAgShawZbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete('user_gQG_7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZlhfZko3dXdkYWgxZXhVSmhyY0MAAgShawZbAwQAjScA', function (err, qr) {
    // })
    // memcached.delete(JSON.stringify({openid:'o3qBK0ZM6UHi58UK_Yy3YymzdEcc'}), function (err, qr) {
    // })
    // UserModel.deleteOne({openid:'o3qBK0RXH4BlFLEIksKOJEzx08og'},function (err,data) {
    //     console.log(data,'-------------------host')
    // })
    // UserModel.deleteOne({openid:'o3qBK0QX8pKSVxlehps3GSL18NXo'},function (err,data) {
    //     console.log(data,'-------------------father')
    // })
    // UserModel.deleteOne({openid:'o3qBK0ZM6UHi58UK_Yy3YymzdEcc'},function (err,data) {
    //     console.log(data,'-------------------user')
    // })
    // AddFreeOrderModel.deleteOne({openid:'o3qBK0RXH4BlFLEIksKOJEzx08og'},function (err,data) {
    //     console.log(data,'-------------------host')
    // })
    // AddFreeOrderModel.deleteOne({openid:'o3qBK0QX8pKSVxlehps3GSL18NXo'},function (err,data) {
    //     console.log(data,'-------------------host')
    // })
    // AddFreeOrderModel.deleteOne({openid:'o3qBK0ZM6UHi58UK_Yy3YymzdEcc'},function (err,data) {
    //     console.log(data,'-------------------host')
    // })
    UserModel.count({code:1},function (err,data) {
        console.log(data,'-------------------code')
    })
    // UserModel.deleteMany({code:1},function (err,data) {
    //     console.log(data,'-------------------code')
    // })
    UserModel.find({code:1},function (err,data) {
        console.log(data,'-------------------code')
    })
}
test()

module.exports.test = test

