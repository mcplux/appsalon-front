<script setup lang="ts">
const authRoutes = [
  { name: 'login', text: 'Log in your account' },
  { name: 'register', text: 'Create an account' },
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <RouterView />

    <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink 
        v-for="route in authRoutes"
        :key="route.name"
        :to="route.name"
        class="uppercase font-bold text-white"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </div>
</template>
