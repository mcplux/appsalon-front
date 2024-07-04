import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import authAPI from '@/api/authAPI'

interface User {
  id: number
  first_name: string
  email: string
  is_admin: boolean
}


export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  
  const user:Ref<User|null> = ref(null)

  function signOut() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
    router.push({ name: 'login' })
  }

  const getUserName:ComputedRef<string> = computed(() => user.value?.first_name || '')

  onMounted(async () => {
    try {
      const { data } = await authAPI.user()
      user.value = data
    } catch (error) {
      console.error(error)
    }
  })

  return {
    user,
    signOut,
    getUserName,
  }
})
