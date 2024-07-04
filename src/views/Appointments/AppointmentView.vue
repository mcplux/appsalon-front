<script setup lang="ts">
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { useAppointmentsStore } from '@/stores/appointments'
import selectedService from '@/components/SelectedService.vue'
import { formatCurrency } from '@/helpers'

const appointmentsStore = useAppointmentsStore()

const disableDates = (date:Date):boolean => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes(date.getDay())
}
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Datails and appointment summary</h2>
  <p class="text-white text-lg mt-5">Verify the information and confirm your appointment</p>

  <h3 class="text-3xl font-extrabold text-white mt-5">Services</h3>

  <p v-if="appointmentsStore.noServiceSelected" class="text-white text-lg text-center mt-5">
    No services selected
  </p>

  <div v-else class="grid gap-5 mt-5">
    <selectedService v-for="service in appointmentsStore.services" :service="service" :key="service.id" />
    <p class="text-white text-right text-2xl">
      Total Amount: <span class="font-black">{{ formatCurrency(appointmentsStore.totalAmount) }}</span>
    </p>
  </div>

  <div class="space-y-8" v-if="!appointmentsStore.noServiceSelected">
    <h3 class="text-3xl font-extrabold text-white">Date and time</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker 
          :disable-date="disableDates"
          disable-in-range
          i18n="en"
          as-single
          no-input
          v-model="appointmentsStore.date"
          :formatter="{
            date: 'DD/MM/YYYY',
            month: 'MMMM',
          }"
        />
      </div>

      <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3 mt-10 lg:mt-0">
        <button 
          v-for="hour in appointmentsStore.hours"
          class="block text-blue-500 rounded-lg text-xl font-black p-3"
          :class="[ appointmentsStore.time === hour ? 'bg-blue-500 text-white' : 'bg-white' ]"
          @click="appointmentsStore.time = hour"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div v-if="appointmentsStore.isValidReservation" class="flex justify-end">
      <button 
        class="w-full md:w-auto bg-blue-500 text-white rounded-lg font-black p-3"
        @click="appointmentsStore.createAppointment"
      >
        Confirm Appointment
      </button>
    </div>
  </div>

</template>
