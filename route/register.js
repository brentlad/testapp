const main = require('../node_modules/app.js');
const app  = main.app;

app.get('/register', function(request,response)
{
	if(request.session.verified)
	{
		response.redirect('/');
	}
	else
	{
		response.render('register');
	}
	response.end();
})