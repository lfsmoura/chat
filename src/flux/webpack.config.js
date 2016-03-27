var webpack = require('webpack');

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
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
}
