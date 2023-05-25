const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const {readFileSync} = require("fs");

module.exports = {
    devServer: {
        https: true,
        host: '0.0.0.0',
        port: 443,
        disableHostCheck: true,
        key: readFileSync('./cert/10174579_voip.wfim.work.key'),
        cert: readFileSync('./cert/10174579_voip.wfim.work.pem')
    },
    css: {
        extract: false,
    },
    configureWebpack: {
        // externals 目前没生效
        externals: {
            client: /\/client\//,
        },
        optimization: {
            splitChunks: false // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'voip-dist.html', // the output file name that will be created
                template: 'src/output-template.html', // this is important - a template file to use for insertion
                inlineSource: '.(js|css)$' // embed all javascript and css inline
            }),
            new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
        ]
    },
}
