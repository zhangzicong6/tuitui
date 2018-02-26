var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TokenSchema = new Schema({
  access_token: String,
  expires_in: Number,
  refresh_token: String,
  openid: String,
  code: String,
  scope: String,
  create_at: String
});

TokenSchema.statics.getToken = function (openid, cb) {
  this.findOne({openid:openid}, function (err, result) {
    if (err) throw err;
    return cb(null, result);
  });
};

TokenSchema.statics.setToken = function (openid, token, cb) {
  // 有则更新，无则添加
  var query = {openid: openid};
  var options = {upsert: true};
  this.update(query, token, options, function (err, result) {
    if (err) throw err;
    return cb(null);
  });
};

var TokenModel = db.model('Token', 'TokenSchema');

module.exports = TokenModel;