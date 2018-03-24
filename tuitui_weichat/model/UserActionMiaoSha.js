var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var UserActionMiaoShaSchema = new Schema({
	openid:String,
	replay_number:Number,
	code:String,
	createAt: {
      type: Date,
      default: Date.now
	},
	updateAt: {
	  type: Date,
	  default: Date.now
	}
},{
	timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
});

var UserActionMiaoShaModel = db.model('UserActionMiaoSha', UserActionMiaoShaSchema);
module.exports = UserActionMiaoShaModel;