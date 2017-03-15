var webpack = require('webpack');

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [ __dirname + "/src/Live/index.js" ]
  },

  output: {
    path: __dirname + '/lib/',
    filename: 'Live.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
