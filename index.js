const main = require('./node_modules/main.js');
const app  = main.app;
app.use(function(request,response,next)
{
	console.log(request.protocol);
	next();
})
const server = require('./node_modules/server.js');
const homeRoute = require('./routes/home.js');