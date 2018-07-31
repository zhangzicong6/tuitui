var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TuiGuangSchema = new Schema({
    type: Boolean,
	id: String,
	// ad_img: String,
	title: String,
	headline: String,
	gonghao: String,
	author: String,
	avator: String,
	content: String,
	linkUrl: String,
	statisticsUrl: String
});

var TuiGuangModel = db.model('TuiGuang', TuiGuangSchema);
module.exports = TuiGuangModel;
