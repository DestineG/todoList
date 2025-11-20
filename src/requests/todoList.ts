// src/requests/todoList.ts

import { supabase } from '@/requests/supabase'

// 获取当前用户 ID (v2 API)
const getCurrentUserId = async (): Promise<string | null> => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('获取当前用户失败:', error.message)
    return null
  }
  return user?.id ?? null
}

// 查询当前用户的 todos
export const getTodos = async () => {
  const userId = await getCurrentUserId()
  if (!userId) return []
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('查询 todos 出错:', error.message)
    return []
  }
  return data
}

// 添加新的 todo
export const addTodo = async (title: string) => {
  const userId = await getCurrentUserId()
  if (!userId) return null
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title, user_id: userId }])

  if (error) {
    console.error('添加 todo 出错:', error.message)
    return null
  }
  return data
}

// 更新 todo 状态
export const toggleTodo = async (id: number, completed: boolean) => {
  const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id)

  if (error) console.error('更新 todo 出错:', error.message)
}

// 删除 todo
export const deleteTodo = async (id: number) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) console.error('删除 todo 出错:', error.message)
}
