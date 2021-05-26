/* 做 webpack 额外的配置 */
const registerRouter = require('./backend/router')

module.exports = {
    lintOnSave: false, //不做eslint提示
    css: {
        loaderOptions: {
            sass: {
                // 全局引入变量和 mixin
                additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
            }
        }
    },
    devServer: {
        before (app) {
            registerRouter(app)
        }
    },
    configureWebpack: (config) => {
        if (process.env.npm_config_report) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            config.plugins.push(new BundleAnalyzerPlugin())
        }
    },
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
};