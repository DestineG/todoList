<template>
  <div>
    <h2>注册</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="doRegister">注册</button>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { register } from '@/requests/auth'

const email = ref('')
const password = ref('')
const message = ref('')

const doRegister = async () => {
  try {
    await register(email.value, password.value)
    message.value = '注册成功，请检查邮箱完成验证'
  } catch (err: any) {
    message.value = '注册失败: ' + err.message
  }
}
</script>
