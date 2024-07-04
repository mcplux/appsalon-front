<script setup lang="ts">
import { ref, type Ref } from 'vue'
import authAPI from '@/api/authAPI'
import useToast from '@/composables/useToast'

interface LoginForm {
  email: string
  password: string
}

const loading:Ref<boolean> = ref(false)

const { openToast } = useToast()

const handleSubmit = async (formData:LoginForm) => {
  try {
    loading.value = true
    const { data: { refresh, access } } = await authAPI.login(formData)
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('access', access)
    openToast('Logged in successfully')
  } catch (error:any) {
    if(error.response.status === 401) {
      openToast('Invalid credentials', 'error')
    } else {
      openToast('An error occurred, try again later', 'error')
    }
  } finally {
    loading.value = false
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center">Login</h1>
  <p class="text-2xl text-white text-center mt-5">Log in your account</p>

  <FormKit id="login-form" type="form" :actions="false" @submit="handleSubmit">
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Enter your email"
      validation="required|email"
    />

    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Create a password"
      validation="required"
    />

    <FormKit type="submit" :disabled="loading">
      Login
    </FormKit>
  </FormKit>
</template>
