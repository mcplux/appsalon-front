<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import ServiceItem from '@/components/ServiceItem.vue'

const servicesStore = useServicesStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Services</h2>
  <p class="text-white text-lg mt-5">Choose at least one service</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
    <ServiceItem v-for="service in servicesStore.services" :key="service.id" :service="service" />
  </div>
</template>
