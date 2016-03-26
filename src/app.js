var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');

var app = express();
app.use(bodyParser.json());

var io;
// dependency injection
app.setSocket = function(_io) {
  io = _io;

  io.on('connection', function(socket) {
    socket.on('move', function(pos) {
      console.log(pos);
      io.emit('changePos', pos);
    });
  });
}

var connectionString = process.env.DATABASE_URL || require('../config').DatabaseUrl;

app.post('/messages/:last_id?', function(request, response) {
  console.log('request sent ' + request.body.message);
  var msg = request.body;

  console.log(msg);
  pg.connect(connectionString, function(err, client, done) {
      // Handle Errors
      if(err) {
        console.log(err);
        done();
        return response.sendStatus(401);
      }

      // SQL Query > Insert Data
      var query = client.query('INSERT INTO messages(username, user_id, message, date) values($1, $2, $3, $4) RETURNING *', [msg.username, msg.user_id, msg.message, new Date().getTime()], function(err, result) {
        if (result && result.rows[0]) {
          console.log(msg, 'vai emitir', result.rows[0]);
          io.emit('message', result.rows[0]);
        }
      });

      query.on('end', function() {
        response.sendStatus(200);
        done();
      });
  });
});

app.get('/messages/:last_id', function(request, response) {
  var last_id = request.params.last_id;
  console.log("user asked for a message " + last_id);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      done();
      return response.sendStatus(401);
    }
    var messages = [];
    var query = client.query('SELECT * FROM messages WHERE id > $1 ORDER BY date ASC', [last_id]);
    query.on('row', function(row) {
      messages.push(row);
    });

    query.on('end', function() {
      client.end();
      response.send(messages);
      done();
    });
  });
});

module.exports = app;
