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

var insertMessage = function(msg) {
// Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle Errors
      if(err) {
        console.log(err);
      }

      // SQL Query > Insert Data
      client.query('INSERT INTO messages("user", message, date) values($1, $2, $3)', [msg.user, msg.message, new Date().getTime()]);

  });
}

app.get('/messages', function(request, response) {
  console.log("user asked all messages");
  pg.connect(connectionString, function(err, client, done) {
    var messages = [];
    var query = client.query("SELECT * FROM messages ORDER BY date ASC");
    query.on('row', function(row) {
      messages.push(row);
    });

    query.on('end', function() {
      client.end();
      response.send(messages);
    });

    if(err) {
      console.log(err);
    }
  });
});

app.post('/messages', function(request, response) {
  console.log('request sent' + request.body.message);
  insertMessage(request.body);
});

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html').toString());
});

app.get('/messages/:last_fetch', function(request, response) {
  last_fetch = request.params.last_fetch;
  console.log("user asked for a message " + last_fetch);
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
