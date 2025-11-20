<template>
  <div class="todo-container">
    <h2>Todo List</h2>
    
    <!-- 输入框新增 todo -->
    <div class="add-todo">
      <input v-model="newTitle" placeholder="输入 todo 内容" @keyup.enter="createTodo" />
      <button @click="createTodo">新增</button>
    </div>

    <!-- 列表 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggle(todo)" />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="remove(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTodos, addTodo, toggleTodo, deleteTodo } from '@/requests/todoList'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTitle = ref('')

// 获取当前用户的 todos
const fetchTodos = async () => {
  todos.value = (await getTodos()) || []
}

// 新增 todo
const createTodo = async () => {
  if (!newTitle.value.trim()) return
  await addTodo(newTitle.value.trim())
  newTitle.value = ''
  fetchTodos()
}

// 切换完成状态
const toggle = async (todo: Todo) => {
  await toggleTodo(todo.id, todo.completed)
}

// 删除 todo
const remove = async (id: number) => {
  await deleteTodo(id)
  fetchTodos()
}

// 初始化加载
onMounted(() => {
  fetchTodos()
})
</script>

<style scoped>
.todo-container {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
}
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
li span.completed {
  text-decoration: line-through;
  color: #999;
}
li button {
  margin-left: auto;
}
</style>
