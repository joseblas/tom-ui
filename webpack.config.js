var webpack = require('webpack'); // eslint-disable-line
var autoprefixer = require('autoprefixer'); // eslint-disable-line
var CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
var HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

var config = { // eslint-disable-line
  baseUrl: 'http://0.0.0.0:8080/',
};

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader',
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?sourceMap&localIdentName=[local]---[hash:base64:5]',
        'postcss-loader',
      ],
    },
    {
      test: /\.(jpe?g|png|ico|gif|svg|ttf|eot|woff)$/i,
      loader: 'file-loader?name=[path][name].[ext]',
    }, {
      test: /\.hbs$/,
      loader: 'handlebars',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.html'],
    modulesDirectories: ['node_modules', process.env.NODE_PATH || 'src'],
  },
  output: {
    path: __dirname + '/dev', // eslint-disable-line
    publicPath: 'http://0.0.0.0:8080/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  postcss: [autoprefixer({ browsers: ['last 4 versions'] })],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /config_test$/,
      './config_development'
    ),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(
        JSON.parse(process.env.NODE_ENV === 'development' || false)
      ),
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      inject: false,
      debug: true,
      config,
      __DEV__: true,
    }),
  ],
  devtool: 'source-map',
};
