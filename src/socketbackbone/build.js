({
  baseUrl: "js",
  paths: {
    'socket.io': 'http://localhost:5000/socket.io/socket.io',
    jquery: '../../../node_modules/jquery/dist/jquery.min',
    Backbone: '../../../node_modules/backbone/backbone-min',
    underscore: '../../../node_modules/underscore/underscore-min'
  },
  name: "main",
  out: "../../public/socketbackbone/js/main.js"
});
