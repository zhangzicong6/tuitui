var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var UserOrderSchema = new Schema({
  openid: String,
  order_number: String,
  status: Number,
  timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
  }
});

var UserOrderModel = db.model('UserOrder', 'UserOrderSchema');

module.exports = UserOrderModel;