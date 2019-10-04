const main    = require('../node_modules/app.js');
const app     = main.app;
const session = main.session;

app.get('/logout',function(request,response)
{
	request.session.verified = false;
	request.session.email    = "";
	response.redirect('/');
	response.end()
})