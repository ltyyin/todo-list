<template>
  <li>
    <label>
      <!-- 这里虽然可以写v-model,但是不好，直接操作了props里面的数据 -->
      <!-- 不会报错的原因：因为props属性中有个对象，直接操作改对象的属性，所以Vue检查不到。 -->
      <!-- 修改引用类型的属性是检查不到的，普通类型的肯定会报错 -->
      <input
        type="checkbox"
        @change="checkTodo(todo.id)"
        :checked="todo.complete"
      />
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
        type="text"
        :value="todo.title"
        v-show="todo.isEdit"
        @blur="handleBlur(todo.id, $event)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="delTodo(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      @click="handleEdit(todo)"
      v-show="!todo.isEdit"
    >
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: ['todo'],
  data() {
    return {}
  },
  methods: {
    checkTodo(todoId) {
      this.$bus.$emit('checkTodo', todoId)
    },
    delTodo(todoId) {
      this.$bus.$emit('delTodo', todoId)
    },
    handleEdit(todo) {
      todo.isEdit !== undefined
        ? (todo.isEdit = true)
        : this.$set(todo, 'isEdit', true)

      this.$nextTick(function() {
        this.$refs.inputTitle.focus()
      })
    },
    handleBlur(todoId, e) {
      this.todo.isEdit = false

      if (!e.target.value.trim()) return alert('输入不能为空！')
      this.$bus.$emit('updateTodo', todoId, e.target.value)
    },
  },
  mounted() {
    // console.log(11)
  },
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background: #ddd;
}

li:hover button {
  display: block;
}
</style>
