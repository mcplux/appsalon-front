import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import useToast from '@/composables/useToast'
import appointmentsAPI from '@/api/appointmentsAPI'
import { convertToISO } from '@/helpers'
import type { Service } from '@/types'

export const useAppointmentsStore = defineStore('appointments', () => {
  const { openToast } = useToast()
  const router = useRouter()
  
  const services:Ref<Service[]> = ref([])
  const date:Ref<string> = ref('')
  const hours:Ref<string[]> = ref([])
  const time:Ref<string> = ref('')

  function resetState(){
    services.value = []
    date.value = ''
    time.value = ''
  }
  
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

  async function createAppointment() {
    const appointment = {
      services: services.value.map(service => service.id),
      date: convertToISO(date.value),
      time: time.value,
      total_amount:totalAmount.value,
    }

    try {
      const { data } = await appointmentsAPI.create(appointment)
      openToast(data.message)
      resetState()
      router.push({ name: 'my-appointments' })
    } catch (error) {
      openToast('An error occurred, please try again later', 'error')
    }
  }

  const isServiceSelected:ComputedRef<(id:number) => boolean> = computed(() => {
    return id => services.value.some(service => service.id === id)
  })

  const noServiceSelected:ComputedRef<boolean> = computed(() => services.value.length === 0)

  const totalAmount:ComputedRef<number> = computed(() => {
    return services.value.reduce((total, service) => total + parseFloat(service.price), 0)
  
  })

  const isValidReservation:ComputedRef<boolean> = computed(() => {
    return services.value.length > 0 && date.value !== '' && time.value !== ''
  })

  onMounted(() => {
    const startHour = 10
    const endHour = 19

    for(let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`)
    }
  })

  return {
    services,
    date,
    hours,
    time,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    noServiceSelected,
    isValidReservation,
    totalAmount,
  }
})
