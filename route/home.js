const main = require('../node_modules/app.js');
const app  = main.app;
const session = main.session;
const account_schema = require('../schema/account.js');
const account_model  = account_schema.model;

app.get('/', async function(request,response)
{
	var user;
	if(!request.session.verified)
	{
		response.render('home');
	}
	else
	{
		user = await find_user(request.session.email);
		response.render('profile',
		{
			data: user
		});
	}
	response.end();
});

function find_user(user)
{
	return new Promise(function(resolve,reject)
	{
		account_model.find({email:user},async function(err,result)
		{
			resolve(result[0]);
		})
	})
}