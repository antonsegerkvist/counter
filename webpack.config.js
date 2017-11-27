const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = {
  entry: {
    app: path.resolve(__dirname, 'assets')
  },
  output: {
    filename: 'public/js/[name].bundle.js',
    path: path.resolve(__dirname, 'source'),
    publicPath: '/'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /(\.css$)|(\.s(a|c)ss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('public/css/app.bundle.css'),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

module.exports = webpackConfig
