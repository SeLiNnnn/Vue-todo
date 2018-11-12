<template>
  <div id="app">
    <!-- 背景虚化 -->
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/hd.vue'
import Todo from './todo/todo.vue'
import Footer from './todo/ft.jsx'

export default {
  components: {
    Header,
    Footer,
    Todo,
  }
}
</script>

<!-- 别忘了注名使用的是stylus预处理器 -->
<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  #cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    z-index -1
    opacity .2
</style>
