var app = require('./src/app.js');
var express = require('express');

app.set('port', (process.env.PORT || 5000));

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.setSocket(io);

app.use(express.static(__dirname + '/public'));

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
  entry: './public/flux/js/main.js',
  output: {
    path: './public/flux/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.src\/flux\/js\/*.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}));

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
