<template>
  <div class="todo-done">
    <ul>
      <li v-for="todo in todos.filter(t => t.completed)" :key="todo.id">
        <span>{{ todo.title }}</span>
        <button @click="remove(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { deleteTodo } from '@/requests/todoList'
import type { Todo } from '@/requests/todoList'

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{ (event: 'update'): void }>()

const remove = async (id: string) => {
  await deleteTodo(id)
  emit('update')
}
</script>

<style scoped>
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
