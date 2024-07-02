import { onMounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import servicesAPI from '@/api/servicesAPI'

interface Service {
  id: number
  name: string
  price: string
}

export const useServicesStore = defineStore('services', () => {
  const services:Ref<Service[]> = ref([])

  onMounted(async () => {
    try {
      const { data } = await servicesAPI.all()
      services.value = data
    } catch (error) {
      console.error(error)
    }
  })

  return {
    services,
  }
})
