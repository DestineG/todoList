<template>
  <div class="todo-doing">
    <!-- 输入框新增 todo -->
    <div class="add-todo">
      <input v-model="newTitle" placeholder="输入 todo 内容" @keyup.enter="createTodo" />
      <button @click="createTodo">新增</button>
    </div>

    <!-- 列表 -->
    <ul>
      <li v-for="todo in todos.filter(t => !t.completed)" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggle(todo)" />
        <span>{{ todo.title }}</span>
        <button @click="remove(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { addTodo, toggleTodo, deleteTodo } from '@/requests/todoList'
import type { Todo } from '@/requests/todoList'

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{ (event: 'update'): void }>()
const newTitle = ref('')

// 新增 todo
const createTodo = async () => {
  if (!newTitle.value.trim()) return
  await addTodo(newTitle.value.trim())
  newTitle.value = ''
  emit('update')
}

// 切换完成状态
const toggle = async (todo: Todo) => {
  await toggleTodo(todo.id, todo.completed)
  emit('update')
}

// 删除
const remove = async (id: string) => {
  await deleteTodo(id)
  emit('update')
}
</script>

<style scoped>
.add-todo {
  display: flex;
  margin-bottom: 1rem;
}
.add-todo input {
  flex: 1;
  padding: 0.5rem;
}
.add-todo button {
  padding: 0.5rem 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
li button {
  margin-left: auto;
}
</style>
