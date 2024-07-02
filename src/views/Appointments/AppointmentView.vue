<script setup lang="ts">
import { useAppointmentsStore } from '@/stores/appointments'
import selectedService from '@/components/SelectedService.vue'
import { formatCurrency } from '@/helpers'

const appointmentsStore = useAppointmentsStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Datails and appointment summary</h2>
  <p class="text-white text-lg mt-5">Verify the information and confirm your appointment</p>

  <h3 class="text-3xl font-extrabold text-white mt-5">Services</h3>
  <div class="grid gap-5 mt-5">
    <selectedService v-for="service in appointmentsStore.services" :service="service" :key="service.id" />
    <p class="text-white text-right text-2xl">
      Total Amount: <span class="font-black">{{ formatCurrency(appointmentsStore.totalAmount) }}</span>
    </p>
  </div>

</template>
