<template>
  <div class="todo-footer" v-show="allTodo">
    <label>
      <!-- v-modle操作的不是props里面的数据，而是计算属性 -->
      <input type="checkbox" :checked="fullTodo" v-model="fullTodo" />
    </label>
    <span>
      <span>已完成{{ done }}</span> / 全部{{ allTodo }}
    </span>
    <button class="btn btn-danger" @click="delFull()">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: ['todos', 'allCheck', 'delFull'],
  computed: {
    // 计算已完成todo的个数
    done() {
      return this.todos.filter(todo => todo.complete).length
    },
    // 计算全部todo的个数
    allTodo() {
      return this.todos.length
    },
    // 这里比较经典，如果 已完成的等于todo总数，全选的勾就勾选。
    // 但是还要注意：删除所有了后那个勾会被勾选，因为已完成的为0，全部也为0，所以会被勾选。要加多一个判断，总数>0
    fullTodo: {
      get() {
        return this.done === this.allTodo && this.allTodo > 0
      },
      set(value) {
        this.allCheck(value)
      },
    },
  },
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
