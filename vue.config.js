const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const {readFileSync} = require("fs");

module.exports = {
    devServer: {
        https: true,
        // 本地调试时，配置需要配置正确的证书
        // 需要使用域名，及对应的证书，最好用阿里云等申请的免费证书，否则可能会有问题
        // host: 'voip.wfim.work', // 此域名解析到 192.168.2.180，如果你能把你本地的 ip 固定成这个，那么可以直接使用
        // port: 443,
        // disableHostCheck: true,
        // key: readFileSync('./cert/test.key'),
        // cert: readFileSync('./cert/test.pem')
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
