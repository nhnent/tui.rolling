/**
 * Configs file for bundling
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */

'use strict';

var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');

module.exports = function(env, argv) {
  var isProduction = argv.mode === 'production';
  var FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');
  var BANNER = [
    'TOAST UI Rolling',
    '@version ' + pkg.version,
    '@author ' + pkg.author,
    '@license ' + pkg.license
  ].join('\n');

  return {
    mode: 'development',
    entry: './src/js/rolling.js',
    output: {
      library: ['tui', 'Rolling'],
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist',
      filename: FILENAME
    },
    externals: {
      'tui-code-snippet': {
        commonjs: 'tui-code-snippet',
        commonjs2: 'tui-code-snippet',
        amd: 'tui-code-snippet',
        root: ['tui', 'util']
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            failOnError: isProduction
          }
        }
      ]
    },
    plugins: [new webpack.BannerPlugin(BANNER)],
    devServer: {
      historyApiFallback: false,
      progress: true,
      host: '0.0.0.0',
      disableHostCheck: true
    }
  };
};