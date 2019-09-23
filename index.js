const main = require('./node_modules/main.js');
const app  = main.app;
app.use(function(request,response,next)
{
	console.log(request.headers['x-forwarded-proto']);
	if(request.headers['x-forwarded-proto'])
	{
		res.redirect('https://' + req.headers.host + req.url);
	}
	next();
})
const server = require('./node_modules/server.js');
const homeRoute = require('./routes/home.js');