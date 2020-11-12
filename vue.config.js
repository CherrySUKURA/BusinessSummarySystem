
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    // 基本路径
    publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    outputDir:"dist",  //打包时生成的生产环境构建文件的目录
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    }
}