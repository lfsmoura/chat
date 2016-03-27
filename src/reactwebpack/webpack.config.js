module.exports = {
  entry: './js/main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  dev-server: {
    inline: true,
    port: 5000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
    ]
  }
}
