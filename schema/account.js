const main     = require('../node_modules/app.js');
const mongoose = main.mongoose;
const account  = mongoose.Schema(
{
	email   : String,
	password: String,
	img     : String
});
const model    = mongoose.model('account',account,'user');
module.exports.model = model;