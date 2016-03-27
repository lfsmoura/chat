//var path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    path: '../../public/flux/',
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
}
/*
{
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
}*/
