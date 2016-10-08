const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');
const pxtorem = require('postcss-pxtorem');

var NODE_ENV = process.env.NODE_ENV;

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
// const isomorphicPath = path.resolve(__dirname, 'src/common/isomorphic.js');

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'babel-polyfill',
    'webpack/hot/only-dev-server',
    './demo/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$|\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader/webpack!babel',
      },
      {
        test: /\.css/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
        ],
        exclude: /node_modules|src\/assets\/stylesheets\/antd-mobile.css/,
      },
      {
        test: /\.css/,
        include: /src\/assets\/stylesheets\/antd-mobile.css|node_modules/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=100000000',
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
    ],
  },
  postcss: function () {
    return[
      atImport({addDependencyTo: webpack, path: ["./css"]}),
      cssnext({browsers: ['> 1%', 'last 2 versions']}),
      pxtorem({rootValue: 100, propWhiteList: []})
    ];
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx', '.json'],
    // alias: {
    //   'isomorphic': isomorphicPath,
    // },
  },
  output: {
    path: '/dist/',
    filename: './bundle.js',
  },
  devServer: {
    contentBase: '/demo',
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 3000,
    host: 'localhost',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'shaco',
      filename: 'index.html',
      template: './demo/template.html',
    }),
  ],
};

module.exports = config;
