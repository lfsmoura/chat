var express = require('express');

var app = express.createServer(express.logger());
app.use(express.static(__dirname));
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

var lastModDate = 0;


var respondGetMessage = function (response) {
  var messages = fs.readFileSync('chat.txt', 'utf-8').split('\n');
  if (messages.length-1 > id) {
    response.send(messages[id]);
  } else {
    // TODO: check if user is out
    setTimeout(function() { respondGetMessage(response); }, 1);
  }
};


app.get('/', function(request, response) {
  console.log(request);
  response.send(fs.readFileSync('index.html').toString());
});

app.get('/message/:id', function(request, response) {
  id = request.params.id;
  console.log("user asked for a message " + id);
  respondGetMessage(response);
});

app.post('/send', function(request, response) {
  console.log('send');
  request.on('data', function(chunk) { 
    console.log(chunk.toString());
    fs.appendFile('chat.txt', chunk.toString().replace(/<(?:.|\n)*?>/gm, '') + '\n');
  });
  response.send("ok");
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
