var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var UserSchema = new Schema({
  openid: String,
  code:String,
  nickname: String,
  sex: String,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
  }
});

UserSchema.statics.getUser = function (openid, cb) {
  this.findOne({openid:openid}, function (err, result) {
    if (err) throw err;
    return cb(null, result);
  });
};



var UserModel = db.model('User', 'UserSchema');

module.exports = UserModel;