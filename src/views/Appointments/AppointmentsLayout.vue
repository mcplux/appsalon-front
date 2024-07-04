<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">AppSalon</h1>

    <div class="flex flex-col space-y-5">
      <div class="flex justify-end gap-2 items-center">
        <p class="text-white text-right">Hi, {{ userStore.getUserName }}</p>
        <button 
          type="button" 
          class="bg-red-600 hover:bg-red-700 uppercase p-2 text-white transition-colors rounded text-xs font-bold"
          @click="userStore.signOut"
        >
          Sign out
        </button>
      </div>

      <nav class="flex flex-col md:flex-row gap-2">
        <RouterLink :to="{ name: 'my-appointments' }" class="p-2 text-gray-200 uppercase text-xs font-black">
          My appointmnets
        </RouterLink>

        <RouterLink :to="{ name: 'new-appointment' }" class="p-2 text-gray-200 bg-blue-600 uppercase text-xs font-black rounded">
          New Appointmnet
        </RouterLink>
      </nav>
    </div>
  </div>

  <RouterView />
</template>
