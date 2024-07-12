import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import authAPI from '@/api/authAPI'
import appointmentsAPI from '@/api/appointmentsAPI'
import { type Service } from '@/types'

interface User {
  id: number
  first_name: string
  email: string
  is_admin: boolean
}

interface Appointment {
  id: number
  date: string
  time: string
  services: Service[]
  total_amount: number
}


export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  
  const user:Ref<User|null> = ref(null)
  const userAppointments:Ref<Appointment[]> = ref([])
  const loading:Ref<boolean> = ref(false)

  function signOut() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
    router.push({ name: 'login' })
  }

  async function getUserAppointments() {
    try {
      const { data } = await appointmentsAPI.getUserAppointments()
      userAppointments.value = data
    } catch (error) {
      console.error(error)
    }
  }

  const getUserName:ComputedRef<string> = computed(() => user.value?.first_name || '')

  const noAppointments:ComputedRef<boolean> = computed(() => userAppointments.value.length === 0)

  onMounted(async () => {
    try {
      loading.value = true
      const { data } = await authAPI.user()
      user.value = data
      await getUserAppointments()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })

  return {
    user,
    userAppointments,
    loading,
    signOut,
    getUserAppointments,
    getUserName,
    noAppointments,
  }
})
