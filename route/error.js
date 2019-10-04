const main = require('../node_modules/app.js');
const app  = main.app;

app.get('*',function(request,response)
{
	response.send('404 lol')
	response.end();
})