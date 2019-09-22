const express = require('express');
const path    = require('path');
const app     = express();
app.use(function(req, res, next)
{
  if(!req.secure) 
  {
    res.redirect(['https://', req.get('Host'), req.url].join(''));
    next();
  }
});
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended:true}));

module.exports.app = app;
