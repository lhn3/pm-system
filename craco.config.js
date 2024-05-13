/**
 * antd主题色
 * 安装@craco/craco、craco-less
 * 新建craco.config.js写入配置
 * index.js中 import 'antd/dist/antd.less'
 * (同时项目可以使用less)
 */
let path = require('path')

const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 修改主题色
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  style: {
    sass: {
      loaderOptions: {}
    }
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  //配置代理解决跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
