var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')

var DEBUG = !(process.env.NODE_ENV === 'production')

if (DEBUG) {
  require('dotenv').config()
}

var config = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: ['./app/app'],
    vendor: [
      'react',
      'react-router',
      'redux',
      'react-dom',
      'lodash',
      'bluebird',
      'humps',
      'history'
    ]
  },
  resolve: {
    modules: [ path.join(__dirname, 'app'), 'node_modules' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'API_BASE_URL'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]---[local]',
              autoprefixer: false,
              camelCase: true,
            },
          },
          'postcss-loader'
        ]
      }
    ]
  }
}


if (DEBUG) {
  config.entry.app.push('webpack-hot-middleware/client?path=/__webpack_hmr')

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: 'vendor.js'
    })
  ])
  config.output.publicPath = '/'
  config.module.rules.unshift({
    test: /\.js$/,
    loader: 'react-hot-loader',
    exclude: /node_modules/,
    include: __dirname
  })
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: '[name].[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ])
}

module.exports = config
