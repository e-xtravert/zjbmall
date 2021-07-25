const path = require('path'); // 引入path模块
function resolve(dir) {
  return path.join(__dirname,dir) //path.join(_dirname)设置绝对路径
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
       'components': resolve('@/components'),
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',

        //router和store一般不需要配置路径，因为都是直接引用的
      }
    }
  }
}