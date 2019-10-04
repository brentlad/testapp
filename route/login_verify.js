const main   = require('../node_modules/app.js');
const app    = main.app;
const bcrypt = main.bcrypt;
const session= main.session;
const { check, validationResult } = require('express-validator');
const account_schema = require('../schema/account.js');
const account_model  = account_schema.model;
var error;

app.post('/login_verify',[
	check('email')
	.isEmail()
	.not()
	.isEmpty()
	.escape(),
	check('password')
	.isLength({min: 8})
	.not()
	.isEmpty()
	.escape()],
	async function(request,response)
{
	error = validationResult(request);
	if(error.isEmpty())
	{
		var user_account = await compare_user(request.body);
		var user_hash;
		if(user_account != undefined)
		{
			user_hash    = await compare_hash(user_account.password,request.body.password);
			if(user_hash)
			{
				request.session.email    = request.body.email;
				request.session.verified = true;
				response.redirect('/');
			}
			else
			{
				console.log('incorrect login info')
			}
		}
		else
		{
			console.log('incorrect login info')
		}
	}
	else
	{
		response.send('an error occured with the fields')
	}
	response.end();
});

function compare_user(user)
{
	return new Promise(function(resolve,reject)
	{
		account_model.find({email:user.email},async function(err,result)
		{
			resolve(result[0]);
		})
	})
}

function compare_hash(dbpass,pass)
{
	return new Promise(function(resolve,reject)
	{
		bcrypt.compare(pass,dbpass,function(err,match)
		{
			resolve(match);
		})
	})
	
}