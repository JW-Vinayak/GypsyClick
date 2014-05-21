var express = require('express')
var app = express();

app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080))
//app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'),process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})