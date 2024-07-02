import { onMounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import servicesAPI from '@/api/servicesAPI'
import type { Service } from '@/types'

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
