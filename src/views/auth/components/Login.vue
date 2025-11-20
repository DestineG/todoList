<template>
  <div>
    <h2>登录</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="doLogin">登录</button>
    <button @click="doLogout" v-if="user">登出</button>
    <p>{{ message }}</p>
    <div v-if="user">已登录用户: {{ user.email }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login, logout, user } from '@/requests/auth'
import router from '@/router'

const email = ref('')
const password = ref('')
const message = ref('')

const doLogin = async () => {
  try {
    await login(email.value, password.value)
    message.value = '登录成功'
    router.push({ name: 'home' })
  } catch (err: any) {
    message.value = '登录失败: ' + err.message
  }
}

const doLogout = async () => {
  try {
    await logout()
    message.value = '已登出'
  } catch (err: any) {
    message.value = '登出失败: ' + err.message
  }
}
</script>
