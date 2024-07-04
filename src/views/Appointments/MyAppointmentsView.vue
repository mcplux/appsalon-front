<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">My appointments</h2>
  <p class="text-white text-lg mt-5">Mange your appointments</p>
</template>
