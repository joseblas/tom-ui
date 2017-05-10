var webpack = require('webpack'); // eslint-disable-line
var autoprefixer = require('autoprefixer'); // eslint-disable-line
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
var CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
var HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const cssLoaders = [
  'css?localIdentName=[local]---[hash:base64:5]',
  'postcss-loader',
];

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', cssLoaders.join('!')),
    },
    {
      test: /\.(jpe?g|png|ico|gif|svg|ttf)$/i,
      loader: 'file-loader?name=[path][name].[ext]',
    },
    {
      test: /\.hbs$/,
      loader: 'handlebars',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.html'],
    modulesDirectories: ['node_modules', process.env.NODE_PATH || 'src'],
  },
  output: {
    path: __dirname + '/dist', // eslint-disable-line
    publicPath: '/',
    filename: 'bundle.js',
  },
  postcss: [autoprefixer({ browsers: ['last 4 versions'] })],
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /config_test$/,
      './config_staging'
    ),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'staging'
      ),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      inject: false,
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets/data',
      to: 'data',
    }]),
    new ExtractTextPlugin('all.css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],
  devtool: 'source-map',
};
