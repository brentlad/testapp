const main = require('../node_modules/main.js');
const app  = main.app;

app.get('/',function(request,response)
{
	response.render('home');
	response.end;
})