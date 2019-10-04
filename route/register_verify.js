const main = require('../node_modules/app.js');
const app  = main.app;
const bcrypt = main.bcrypt;
const account_schema = require('../schema/account.js');
const account_model  = account_schema.model;
const { check, validationResult } = require('express-validator');
var errors;

app.post('/register_verify',[
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
		errors = validationResult(request);
		if (errors.isEmpty() && request.body['g-recaptcha-response'] !='')
		{
			var hash_password = await hash(request.body.password);
			var is_duplicate  = await check_duplicate(request.body.email);
			if(!is_duplicate)
			{
				createAccount(request.body.email,hash_password);
				response.redirect('/');
			}
			else
			{
				response.send('email address already registered');
			}
		}
		else
		{
			response.send('All fields must be filled. Passwords need to be atleast 8 characters long')
		}
		response.end();
	}
);

function hash(password)
{
	return new Promise(function(resolve,reject)
	{
	 	bcrypt.hash(password,5,function(err,bpassword)
		{
			resolve(bpassword);
		})
	})
}

function check_duplicate(name)
{
	return new Promise(function(resolve,reject)
	{
		account_model.findOne({email:name},{useFindModify:false},function(err,result)
		{
			if(result === null)
			{
				resolve(false)
			}
			else
			{
				resolve(true);
			}
		});
	})
}

function createAccount(user,pass)
{
	let account = new account_model(
	{
		email   : user, 
		password: pass,
		img     :'default.jpg'
	});
	account.save();
}
