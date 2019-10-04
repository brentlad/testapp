const main = require('../node_modules/app.js');
const app  = main.app;

app.get('/login',function(request,response)
{
	response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(request.session.verified)
	{
		response.redirect('/');
	}
	else
	{
		response.render('login');
	}
	response.end();
})