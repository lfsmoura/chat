var app = require('./src/app.js');
var express = require('express');

app.set('port', (process.env.PORT || 5000));

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.setSocket(io);

app.use(express.static(__dirname + '/public'));

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
