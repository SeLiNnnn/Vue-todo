import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div') 
document.body.appendChild(root)// 节点?

new Vue({
  render: (h) => h(App)//接收一个h参数 把app挂载上去  这一步先声明挂载内容
}).$mount(root)//这一步挂载root节点