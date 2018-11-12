<template>
  <section class="rel-app">
    <input 
      type="text" 
      class="add-input" 
      autofocus="autofocus" 
      placeholder="接下去要做什么?" 
      @keyup.enter="addTodo"
    >
    <item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    
    <tabs 
      :filter="filter" 
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'


export default {
  data () {
    return {
      todos: [],
      filter: 'all',
      id: 0
    }
  },
  components: {
    Item,
    Tabs,
  },
  methods: {
    addTodo(e,id) {
      this.todos.unshift({
        id: this.id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''// 每次输出后清空
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos// 显示全部
      } 
      const completed = this.filter === 'completed'//是completed就为true
      return this.todos.filter(todo => completed === todo.completed)
    }
  }
}
</script>

<style lang="stylus">
.rel-app
  width 600px
  margin 0 auto 
  box-shadow 0 0 5px #666
.add-input
  position relative
  width 100%
  font-size 24px
  font-family inherit 
  font-weight inherit 
  line-height 1.4em
  outline none 
  color inherit 
  padding 6px
  border 1px solid #999
  box-shadow inset 0 -1px 5px 0 rgba(0, 0, 0, .5)
  box-sizing border-box
  padding 16px 16px 16px 60px
</style>

