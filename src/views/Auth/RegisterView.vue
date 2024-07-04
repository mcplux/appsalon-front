<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { reset } from '@formkit/vue'
import authAPI from '@/api/authAPI'
import useToast from '@/composables/useToast'

interface RegisterForm {
  first_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const loading:Ref<boolean> = ref(false)

const { openToast } = useToast()

const handleSubmit = async ({ password_confirm, ...formData }:RegisterForm) => {
  try {

    loading.value = true
    const { data } = await authAPI.register(formData);
    openToast(data.message)
    reset('register-form')

  } catch (error:any) {

    if(error.response.data.message) {
      openToast(error.response.data.message, 'error')
    } else {
      openToast('An error occurred, try again later', 'error')
    }

  } finally {

    loading.value = false

  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center">Register</h1>
  <p class="text-2xl text-white text-center mt-5">Create an account on AppSalon</p>

  <FormKit id="register-form" type="form" :actions="false" @submit="handleSubmit">
    <FormKit
      type="text"
      label="Name"
      name="first_name"
      placeholder="Enter your name"
      validation="required|length:3"
    />

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
      placeholder="Create a password - Min 8 characters"
      validation="required|length:8"
    />

    <FormKit
      type="password"
      label="Confirm Password"
      name="password_confirm"
      placeholder="Confirm your password"
      validation="required|confirm"
    />

    <FormKit type="submit" :disabled="loading">
      Create account
    </FormKit>
  </FormKit>
</template>
