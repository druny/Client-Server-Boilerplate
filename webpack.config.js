const path = require('path');

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: ['babel-polyfill', './client/index.jsx'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    new CommonsChunkPlugin({ name: 'manifest' }),
    new ExtractTextPlugin({
      filename: 'master.css',
      allChunks: true,
      disable: !ENV_PRODUCTION,
    }),
    new HtmlWebpackPlugin({
      template: './client/template.html',
      chunksSortMode: 'dependency',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },
};

if (!ENV_PRODUCTION) {
  config.devtool = 'cheap-module-source-map';

  config.plugins.push(new HotModuleReplacementPlugin());
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    ],
  });

  config.entry.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server'
  );

  config.devServer = {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    port: PORT,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      cached: false,
      cachedAssets: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false,
      modules: false,
    },
  };
}

if (ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';

  config.modules.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader?modules&localIdentName="[name]__[local]__[hash:base64:6]"'
    }),
  });
}

module.exports = config;
