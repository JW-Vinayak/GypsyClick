var express = require('express')
var app = express();

app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080))
//app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	console.log('request received for base');
  response.send('Hello World!')
})

app.get('/index', function(request, response) {
	console.log('request received for index');
  response.send('Index request received!')
})


app.listen(app.get('port'),process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function() {
	console.log('IP address is ' + process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  console.log("Node app is running at localhost:" + app.get('port'))
})