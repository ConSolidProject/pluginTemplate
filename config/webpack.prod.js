const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const domain = "https://d2xe91n4zwx6dq.cloudfront.net"

const prodConfig = {
    mode: 'production',
    output: {
        filename: "[name].[contenthash].js",
        publicPath: `${domain}/${packageJSON.name}/latest/`
    },
    plugins: [
        new ModuleFederationPlugin({
            name: packageJSON.name,
            filename: 'remoteEntry.js',
            exposes: {
                "./index": "./src/bootstrap"
            },
            shared: {...packageJSON.dependencies}
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)