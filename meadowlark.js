var fortune = require('./lib/fortune.js');
var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({ defaultlayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set static directory
app.use(express.static(__dirname + '/public'));

//set what port the app will listen on
app.set('port', process.env.PORT || 3000);

//set up URLs to add tests
app.use(function(req,res,next){
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test == '1';
  next();
})

//set routes
app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', { fortune: fortune.getFortune() } );
});

//404 catch-all handler
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
