var webpack = require('webpack')

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
    path: __dirname + '/dist/',
    filename: '[name].js',
    // 通过webpack-dev-server动态打包编译后的js文件输出路径，这样在开发和生产环境都可以通过/dist/调用js文件
    publicPath: '/dist/'
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    contentBase: './server/views'    // 服务器根目录
  }
}
