<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'Top',
  methods: {
    add(e) {
      // 当输入的内容为空时，不添加
      if (!e.target.value.trim()) return alert('内容不能为空值')

      //  将用户的输入包装成一个todo对象
      const todoObj = {
        id: nanoid(),
        title: e.target.value.trim(),
        complete: false,
      }

      // 用户新输入生成的对象传给App父组件（使用了回调函数）
      this.addTodo(todoObj)

      e.target.value = ''
    },
  },
  data() {
    return {
      items: [],
    }
  },
  props: ['addTodo'],
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
