const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");
const path = require('path')

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    symlinks: false,
    modules: [
      'node_modules'
    ],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer/"),
      os: require.resolve("os-browserify/browser"),
      assert: require.resolve("assert/"),
      zlib: require.resolve("browserify-zlib"),
      events: require.resolve("events/"),
      path: require.resolve("path-browserify")
    }
  },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.ProvidePlugin({
        stream: "stream-browserify",
      })
    ],
  };
  