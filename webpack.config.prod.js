var webpack = require('webpack');

module.exports = {
  devtool: false,

  entry: {
    login  : './client/pages/login.js',
    index  : './client/pages/index.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: __dirname + '/server/static/dist/',
    filename: '[name].js',
    publicPath: '/server/static/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor"),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}
