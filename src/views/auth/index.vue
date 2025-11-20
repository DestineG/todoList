<template>
  <div class="auth-container">
    <div class="tabs">
      <button 
        v-if="active !== 'login'" 
        @click="active = 'login'">
        去登录
      </button>
      <button 
        v-if="active !== 'register'" 
        @click="active = 'register'">
        去注册
      </button>
    </div>

    <!-- 动态切换组件 -->
    <component :is="activeComponent" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const active = ref<'login' | 'register'>('login')

// 根据 active 动态选择组件
const activeComponent = computed(() => {
  return active.value === 'login' ? Login : Register
})
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.tabs button {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
