var app = require('./src/app.js');
var express = require('express');

app.set('port', (process.env.PORT || 5000));

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.setSocket(io);


var path = require('path');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
  entry: path.join(__dirname, 'src/flux/js/main.js'),
  output: {
    path: path.join(__dirname, 'public/flux/'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/flux/'
}));

app.use(express.static(__dirname + '/public'));

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
