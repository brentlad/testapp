const main = require('./node_modules/main.js');
const app  = main.app;
app.use(function(request,response,next)
{
	console.log(request.headers['x-forwarded-proto']);
	if(request.headers['x-forwarded-proto'])
	{
		response.redirect('https://' + request.headers.host + request.url);
	}
})
const server = require('./node_modules/server.js');
const homeRoute = require('./routes/home.js');