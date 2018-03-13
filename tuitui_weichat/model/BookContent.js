var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var BookContentSchema = new Schema({
	book_id:Number,
	bookname:String,
	chapte_id:{type: Number,unique: true},
	chapte_name:String,
	content:String,
	last_chapte:Number,
	next_chapte:Number
});

var BookContentModel = db.model('BookContent', BookContentSchema);
module.exports = BookContentModel;