const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json')

const devConfig = {
  mode: 'development',
  devServer: {
    port: packageJSON.port,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
        name: packageJSON.name,
        filename: 'remoteEntry.js',
        exposes: {
            "./index": "./src/bootstrap"
        },
        shared: {...packageJSON.dependencies}
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
