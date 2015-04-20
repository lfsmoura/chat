var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
//app.use(express.static('js'));
app.use(express.static(__dirname + '/css'));

var respondGetMessage = function (response) {
  var messages = fs.readFileSync('chat.txt', 'utf-8').split('\n');
  if (messages.length-1 > id) {
    response.send(messages[id]);
  } else {
    // TODO: check if user is out
    setTimeout(function() { respondGetMessage(response); }, 1);
  }
};

app.get('/messages', function(request, response) {
  console.log("user asked all messages");
  var count = 0;
  messages = fs.readFileSync('chat.txt')
      .toString().split('\n')
      .filter(function(s) { return s; })
      .map(function(s) { 
        m = s.split('§');
        return {id:count++, user: m[0], message: m[1]} });
  response.send(messages);
});

app.post('/messages', function(request, response) {
  console.log('request sent' + request.body.message);
  fs.appendFile('chat.txt', "\n" + request.body.user + "§" + request.body.message);
});

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html').toString());
});

app.get('/messages/:last_fetch', function(request, response) {
  last_fetch = request.params.last_fetch;
  console.log("user asked for a message " + last_fetch);
  /*fs.stat('chat.txt', function(err, stats) { 
    last_update = stats.mtime.getTime();
    if (last_fetch <= last_update)
      console.log('out of sync');
  })*/
});

/*
app.post('/send', function(request, response) {
  console.log('send');
  request.on('data', function(chunk) { 
    console.log(chunk.toString());
    fs.appendFile('chat.txt', chunk.toString().replace(/<(?:.|\n)*?>/gm, '') + '\n');
  });
  response.send("ok");
});*/

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
