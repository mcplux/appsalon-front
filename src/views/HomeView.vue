<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push({ name: 'my-appointments' })
})
</script>

<template>
  <main>
    <h1>Hello world</h1>
  </main>
</template>
