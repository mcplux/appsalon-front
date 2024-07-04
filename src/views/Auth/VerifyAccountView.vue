<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authAPI from '@/api/authAPI'
import useToast from '@/composables/useToast'

const route = useRoute()
const router = useRouter()

const { openToast } = useToast()

const token:string = route.params.token as string

onMounted(async () => {
  try {
    const { data } = await authAPI.verifyAccount(token)
    openToast(data.message, 'success')
    router.push({ name: 'login' })
  } catch (error:any) {
    openToast(error.response.data.message, 'error')
  }
})
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center">Verify Account</h1>
</template>
