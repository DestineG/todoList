<template>
  <div class="todo-tabs">
    <h2>Todo List</h2>

    <!-- 退出按钮 -->
    <button class="logout-btn" @click="doLogout">退出</button>

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
import router from '@/router'
import TodoDoing from './components/Doing.vue'
import TodoDone from './components/Done.vue'
import { getTodos } from '@/requests/todoList'
import type { Todo } from '@/requests/todoList'
import { logout } from '@/requests/auth'

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

// 退出登录
const doLogout = async () => {
  try {
    await logout()
    alert('已登出，返回登录页')
    router.push('/login')
  } catch (err: any) {
    alert('登出失败: ' + err.message)
  }
}
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

/* 退出按钮样式 */
.logout-btn {
  float: right;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background: #ff7875;
}
</style>
