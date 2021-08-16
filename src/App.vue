<template>
  <div>
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <Top :addTodo="addTodo" />
          <List :todos="todos" />
          <Bottom :todos="todos" :delFull="delFull" :allCheck="allCheck" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import List from './components/List'
import Bottom from './components/Bottom'
export default {
  name: 'Root',
  components: {
    Top,
    List,
    Bottom,
  },
  data() {
    return {
      // 一开始读取浏览器内存中的值
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      // [
      //   { id: '001', title: '吃饭', complete: false },
      //   { id: '002', title: '背单词', complete: false },
      //   { id: '003', title: '跑步', complete: false },
      // ]
    }
  },
  methods: {
    // 回调函数
    addTodo(todo) {
      // Top传入数据时，就调用该函数
      this.todos.unshift(todo)
    },

    allCheck(check) {
      this.todos.forEach(todo => {
        todo.complete = check
      })
    },
    delFull() {
      this.todos = this.todos.filter(todo => {
        return !todo.complete
      })
    },
  },

  // 监测todos的变化
  watch: {
    todos: {
      deep: true,
      handler(newValue) {
        // 存入到浏览器内存中
        localStorage.setItem('todos', JSON.stringify(newValue))
      },
    },
  },

  mounted() {
    this.$bus.$on('checkTodo', id => {
      this.todos.forEach(todo => {
        if (id === todo.id) todo.complete = !todo.complete
      })
    })
    this.$bus.$on('delTodo', id => {
      this.todos.forEach((todo, index) => {
        if (id === todo.id) {
          if (confirm('你确定要删除吗?')) {
            this.todos.splice(index, 1)
          }
        }
      })
    })
    this.$bus.$on('updateTodo', (todoId, value) => {
      this.todos.forEach(todo => {
        if (todoId === todo.id) todo.title = value
      })
    })
  },
  beforeDestroy() {
    this.$bus.$off('checkTodo')
    this.$bus.$off('delTodo')
    this.$bus.$off('updateTodo')
  },
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(79, 153, 182);
  margin-right: 8px;
}

.btn-edit:hover {
  color: #fff;
  background-color: rgb(57, 158, 197);
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
