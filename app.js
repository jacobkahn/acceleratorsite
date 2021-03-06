// var env = require('node-env-file');
// env(__dirname + '/.' + process.env.NODE_ENV + '_env');

var express = require('express');
var routes = require('./routes/routes.js');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Well, looks like something broke! Try again in a few minutes, and if it\'s still broken, let us know at accelerator@pennapps.com');
});

app.get('/', routes.main);
app.post('/apps', routes.new_app);
app.get('/admin', routes.get_admin);
app.post('/admin', routes.post_admin);
app.get('/apply', routes.apply);
app.get('/join', routes.join);

console.log('PennApps Accelerator website');
app.listen(app.get('port')).on('error', function(){
	console.log("[Err] Server initiation failed. Port in use?");
});
console.log('Server running on port ' + app.get('port') + '. Now open http://localhost:' + app.get('port') +'/ in your browser.');

