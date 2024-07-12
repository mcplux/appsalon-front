<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id:string = route.params.id.toString()

onMounted(() => {
  console.log(id)
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink 
      :to="{ name: 'edit-appointment', params: { id } }" 
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="[ route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500' ]"
      >
        Services
    </RouterLink>
    <RouterLink 
      :to="{ name: 'edit-appointment-details' }" 
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="[ route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500' ]"
      >
        Summary
    </RouterLink>
  </nav>
  <RouterView />
</template>
