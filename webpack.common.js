const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const foundationPath = path.resolve(__dirname, 'node_modules', 'foundation-sites');
const jqueryPath = path.resolve(__dirname, 'node_modules', 'jquery');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./src/app/config');

const PUBLIC_PATH = `public${config.appRoute}`;

const commonComponentsResources = [{
  from: path.join(__dirname, 'src', 'client', 'images'),
  to: path.join(__dirname, PUBLIC_PATH, 'images', '[name].[ext]')
}];


module.exports = {
  entry: {
    'bundle': ['./src/client/javascripts/index.jsx', './src/client/styles/main.scss'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'js/[name].app.js',
    publicPath: config.appRoute + '/',
    path: path.resolve(process.cwd(), PUBLIC_PATH)
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.sass'],
    alias: {
      app: path.resolve(__dirname, 'src', 'app'),
      client: path.resolve(__dirname, 'src', 'client'),
      config: path.resolve(__dirname, 'config'),
      test: path.resolve(__dirname, 'test'),
      styles: path.resolve(__dirname, 'src', 'client','styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src', 'client', 'javascripts'),
          foundationPath
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src', 'client', 'styles')
        ],
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9',
                ],
                flexbox: 'no-2009',
              }),
            ],
          }
        }]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', 'client')
        ],
        use: [{
          loader: process.env.NODE_ENV === 'local' ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9',
                ],
                flexbox: 'no-2009',
              }),
            ],
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(woff2|ttf|woff|svg)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new MiniCssExtractPlugin({
      filename: 'style.[hash:10].css'
    }),
    new CopyWebpackPlugin(commonComponentsResources, {
      copyUnmodified: true
    }),
    new StatsWriterPlugin({
      fields: ['assets'],
      filename: 'assets.js',
      transform(stats) {
        const manifest = {};
        stats.assets.map(asset => asset.name)
          .sort()
          .forEach((file) => {
            file = file.replace('images/', '');
            manifest[file.replace(/\.[a-f0-9]{10}\./, '.')] = file;
          });
        return 'window.assets = ' + JSON.stringify(manifest, null, 2) + ';\n';
      }
    })
  ]
};