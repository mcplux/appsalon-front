<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Appointment from '@/components/Appointment.vue'

const userStore = useUserStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">My appointments</h2>
  <p class="text-white text-lg mt-5">Mange your appointments</p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Loading...</p>
  <div v-else>
    <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">You have no appointments</p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <Appointment v-for="appointment in userStore.userAppointments" :key="appointment.id" :appointment="appointment" />
    </div>
  </div>
</template>
