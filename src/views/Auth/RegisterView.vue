<script setup lang="ts">
import authAPI from '@/api/authAPI'

interface RegisterForm {
  first_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const handleSubmit = async ({ password_confirm, ...data }:RegisterForm) => {
  try {
    await authAPI.register(data);
  } catch (error) {
    console.error(error)
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center">Register</h1>
  <p class="text-2xl text-white text-center mt-5">Create an account on AppSalon</p>

  <FormKit type="form" :actions="false" @submit="handleSubmit">
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

    <FormKit type="submit">
      Create account
    </FormKit>
  </FormKit>
</template>
