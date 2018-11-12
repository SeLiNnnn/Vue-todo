const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')//渲染html页面
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV == 'development'//NODE_ENV等变量存在于process.env对象里 判断是否是dev环境

// module.exports = {// 加了env以后就换成const config
const config = {
  target: 'web',//webpack编译目标-web平台
  entry: path.join(__dirname, 'src/index.js'),//index.js入口文件有了以后 再写这里
  output: {//出口
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')//把文件打包到dist文件夹
    //在package.json里加上build 调用项目里的webpack
  },
  module: {
    rules: [
      {
        test: /\.vue$/,// 处理.vue文件
        loader: 'vue-loader'// 自动热加载
      },
      {
        test: /\.jsx$/,// 处理.jsx
        loader: 'babel-loader'
      },
      // {
      //   // css预处理器
      //   test: /\.styl$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',// 这里也可以生成source-map 自动使用前面的source-map来加载 提供效率
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // },
      {// 处理图片
        test: /\.(gif|jpg|jpeg|png|svg)/,
        use: [
          {// 每个loader都有很多选项可以配置 所以使用json{}
            loader: 'url-loader',//把图片转成js代码
            options: {// 选项配置
              limit: 1024,//1024大小
              name: '[name]-aaa.[ext]'//指定输出的图片名字 ext是扩展名
            }
          }
        ]
      }
    ]
  },
  plugins: [//这个插件是在webpack上的需要引入
    new webpack.DefinePlugin({//使用vue react等框架就需使用这个
      'process.env': {//环境判断
        NODE_ENV: isDev ? '"development"' : '"production"'//注意里面一定要有双引号
        //这样写是因为 如果不加双引号 调用时会变成:process.env.NODE_ENV = development 没有定义过development这个变量就会报错
      }//这样做是因为vue等框架里有很多开发时候需要用到的错误提示等东西 但在上线时会增加项目大小
    }),
    new HTMLPlugin()
  ]
}

// 判断正式环境和开发环境 
if (isDev) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',// 这里也可以生成source-map 自动使用前面的source-map来加载 提供效率
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'//帮助调试被转成了es5的代码 source-map最完成映射 但效率低文件比较大 只有eval的话代码比较乱
  config.devServer = {
    port: '8000',//devsever启动端口
    host: '0.0.0.0',//一般都设置成这样 可以同时访问localhost和127.0.0.1
    overlay: {
      errors: true,//webpack出现的任何错误都显示到网页中
    },
    //open: true //启动dev-server的时候自动打开浏览器
    // historyFallback: {
    //   // 映射路由地址
    // }
    hot: true// 开发SPA的时候使用 如果页面有很多内容 使用hot 只重新渲染当前组件 不会整页刷新
  }
  config.plugins.push(// 加入hot的插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()//解决不需要信息的展示问题 一般都会加上
  )
} else {
  config.entry = {// 分别打包类库文件vue
    app: path.join(__dirname,'src/index.js'),
    vendor: ['vue']// 如果还要使用vue-router等都写在这里
  }
  config.output.filename = '[name].[chunkhash:8].js'//如果这里也用hash打包出来的hash会和vendor.js的hash相同 因为js文件会使用一个hash 如果要单独打包类库等 必须用chunkhash
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),//单独区分css打包文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'// vendor一定要放在runtime之前
    }),
    new webpack.optimize.CommonsChunkPlugin({// 把在app.js里的webpack代码单独打包 这样在有新的插件添加时 不会改变hash值 
      name: 'runtime'//声明一个名字 一般是runtime

    })
  )
}

module.exports = config