import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import useToast from '@/composables/useToast'
import appointmentsAPI from '@/api/appointmentsAPI'
import { convertToISO, convertToDDMMYYYY } from '@/helpers'
import type { Service } from '@/types'

export const useAppointmentsStore = defineStore('appointments', () => {
  const { openToast } = useToast()
  const router = useRouter()
  
  const appointmentId:Ref<string|null> = ref(null)
  const services:Ref<Service[]> = ref([])
  const date:Ref<string> = ref('')
  const hours:Ref<string[]> = ref([])
  const time:Ref<string> = ref('')
  const appointmentsByDate:Ref<any> = ref([])

  function resetState(){
    services.value = []
    date.value = ''
    time.value = ''
  }

  function setSelectedAppointment(appointment:any) {
    services.value = appointment.services
    date.value = convertToDDMMYYYY(appointment.date)
    appointmentId.value = appointment.id
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

  const isDateSelected:ComputedRef<boolean> = computed(() => date.value !== '')

  const isHourDisabled:ComputedRef<(hour:string) => boolean> = computed(() => {
    return hour => appointmentsByDate.value.find((appointment:any) => appointment.time === hour)
  })

  onMounted(() => {
    const startHour = 10
    const endHour = 19

    for(let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`)
    }
  })

  watch(date, async () => {
    time.value = ''
    
    if (date.value === '') {
      return
    }

    const { data } = await appointmentsAPI.getByDate(convertToISO(date.value))
    
    if (appointmentId.value !== null) {
      // Editing...
      appointmentsByDate.value = data.filter((appointment:any) => appointment.id !== appointmentId.value)
      time.value = data.filter((appointment:any) => appointment.id === appointmentId.value)[0].time
    } else {
      // Creating...
      appointmentsByDate.value = data
    }
  })

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    noServiceSelected,
    isValidReservation,
    totalAmount,
    isDateSelected,
    isHourDisabled,
  }
})
