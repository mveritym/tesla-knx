var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var api_routes = require('./server/routes.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.use('/api/', api_routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
