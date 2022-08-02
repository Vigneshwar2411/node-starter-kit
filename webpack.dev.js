const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('./src/app/config');

const openPagePath = () => {
  if (config.appRoute.substring(1).length) {
    return `${config.appRoute.substring(1)}/`
  }
  return '';
}

module.exports = merge(common, {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://127.0.0.1:8100',
      'webpack/hot/only-dev-server'
    ]
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'src', 'client'),
    historyApiFallback: true,
    hot: true,
    port: 8100,
    publicPath: `http://localhost:8100${common.output.publicPath}`,
    open: true,
    openPage: openPagePath(),
    proxy: {
      '*': {
        target: `http://localhost:${config.port}`,
      },
    },
    noInfo: false
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});