var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');

var app = express();
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
//app.use(express.static('js'));
app.use(express.static(__dirname + '/css'));

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

var respondGetMessage = function (response) {
  var messages = fs.readFileSync('chat.txt', 'utf-8').split('\n');
  if (messages.length-1 > id) {
    response.send(messages[id]);
  } else {
    // TODO: check if user is out
    setTimeout(function() { respondGetMessage(response); }, 1);
  }
};

var stripHtml = function(s) {
  return s.replace(/<\/?[^>]+(>|$)/g, "");
}


app.post('/messages/:last_id', function(request, response) {
  console.log('request sent' + request.body.message);
  var msg = request.body;
  pg.connect(connectionString, function(err, client, done) {
      // Handle Errors
      if(err) {
        console.log(err);
      }

      // SQL Query > Insert Data
      client.query('INSERT INTO messages(username, user_id, message, date) values($1, $2, $3, $4)', [msg.username, msg.user_id, msg.message, new Date().getTime()]).on('end', function() {
        response.sendStatus(200);
      });
  });
});

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html').toString());
});

app.get('/messages/:last_id', function(request, response) {
  var last_id = request.params.last_id;
  console.log("user asked for a message " + last_id);
  pg.connect(connectionString, function(err, client, done) {
    if(err)
      console.log(err);

    var messages = [];
    var query = client.query('SELECT * FROM messages WHERE id > $1 ORDER BY date ASC', [last_id]);
    query.on('row', function(row) {
      messages.push(row);
    });

    query.on('end', function() {
      client.end();
      if (messages.length > 0)
        response.send(messages);
      else
        response.sendStatus(304);
    });
  });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
