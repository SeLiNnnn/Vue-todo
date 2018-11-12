const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // 自动处理需要加浏览器前缀的css属性 
    autoprefixer()
  ]
}

// css编译完成后 通过postcss去优化css代码 后处理css