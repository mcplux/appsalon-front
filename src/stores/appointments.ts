import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Service } from '@/types'

export const useAppointmentsStore = defineStore('appointments', () => {
  const services:Ref<Service[]> = ref([])
  
  function onServiceSelected(service:Service):void {
    if(services.value.some(selectedService => selectedService.id === service.id)) {
      services.value = services.value.filter(selectedService => selectedService.id !== service.id)
      return
    }
    if(services.value.length >= 2) {
      alert('You can only select up to 2 services')
      return
    }
    services.value.push(service)
  }

  const isServiceSelected:ComputedRef<(id:number) => boolean> = computed(() => {
    return id => services.value.some(service => service.id === id)
  })

  return {
    services,
    onServiceSelected,
    isServiceSelected,
  }
})
