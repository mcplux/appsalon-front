<script setup lang="ts">
import { convertToDDMMYYYY, formatCurrency } from '@/helpers'
import { useAppointmentsStore } from '@/stores/appointments';

defineProps({
  appointment: {
    type: Object,
    required: true,
  }
})

const appointmentsStore = useAppointmentsStore()
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Date: <span class="font-light">{{ convertToDDMMYYYY(appointment.date) }}</span>
      Time: <span class="font-light">{{ appointment.time }}</span>
    </p>
    <p class="text-lg font-black">Services:</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>
    
    <p class="text-2xl font-black text-right">
        Total: <span class="text-blue-600">{{ formatCurrency(appointment.total_amount) }}</span>
    </p>

    <div class="flex gap-2 items-center">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment.id } }"
        class="bg-slate-600 rounded p-3 text-sm text-white font-black flex-1 md:flex-none uppercase text-center"
      >
        Edit Appointment
      </RouterLink>

      <button 
        class="bg-red-600 rounded p-3 text-sm text-white font-black flex-1 md:flex-none uppercase"
        @click="appointmentsStore.cancelAppointment(appointment.id)"
      >
        Cancel Appointment
      </button>
    </div>
  </div>
</template>
