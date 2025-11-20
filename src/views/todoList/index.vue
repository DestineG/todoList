<template>
  <div class="todo-tabs">
    <h2>Todo List</h2>

    <!-- Tabs 切换 -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'todo' }" @click="activeTab = 'todo'">正在做</button>
      <button :class="{ active: activeTab === 'done' }" @click="activeTab = 'done'">已完成</button>
    </div>

    <!-- Tab 内容 -->
    <TodoDoing v-if="activeTab === 'todo'" 
               :todos="todos" 
               @update="fetchTodos" />
    <TodoDone v-if="activeTab === 'done'" 
              :todos="todos" 
              @update="fetchTodos" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TodoDoing from './components/Doing.vue'
import TodoDone from './components/Done.vue'
import { getTodos } from '@/requests/todoList'
import type { Todo } from '@/requests/todoList'

const todos = ref<Todo[]>([])
const activeTab = ref<'todo' | 'done'>('todo')

// 获取 todos
const fetchTodos = async () => {
  todos.value = (await getTodos()) || []
}

// 初始化加载
onMounted(() => {
  fetchTodos()
})
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tabs button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  background: #eee;
  border-radius: 4px;
}
.tabs button.active {
  background: #42b983;
  color: white;
}
</style>
