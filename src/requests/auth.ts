// src/requests/auth.ts
import { ref } from 'vue'
import { supabase } from './supabase'

// 全局响应式用户
export const user = ref<any>(null)

// 监听登录状态变化，页面刷新或登出都会更新
supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null
})

// 注册
export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new Error(error.message)
  return data
}

// 登录
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  user.value = data.user
  return data
}

// 登出
export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
  user.value = null
}

// 获取当前用户
export const getCurrentUser = () => user.value
