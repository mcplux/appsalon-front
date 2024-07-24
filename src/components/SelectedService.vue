<script setup lang="ts">
import { useAppointmentsStore } from '@/stores/appointments'
import { formatCurrency } from '@/helpers'
import type { Service } from '@/types'

defineProps({
  service: {
    type: Object,
    required: true,
  }
})

const appointmentsStore = useAppointmentsStore()
</script>

<template>
  <div class="border border-gray-600 rounded-lg p-5 flex items-center justify-between">
    <div>
      <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
      <p class="text-3xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <button 
      type="button" 
      class="inline-flex items-center rounded bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 font-semibold shadow-sm transition-colors"
      @click="appointmentsStore.onServiceSelected(service as Service)"
    >
      Delete
    </button>
</div>
</template>
