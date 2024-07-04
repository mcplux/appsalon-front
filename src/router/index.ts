import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '@/views/Appointments/AppointmentsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsLayout,
      children: [
        {
          path: 'new',
          component: () => import('@/views/Appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('@/views/Appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'appointment-details',
              component: () => import('@/views/Appointments/AppointmentView.vue'),
            },
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Auth/RegisterView.vue'),
        },
        {
          path: 'verify-account/:token',
          name: 'verify-account',
          component: () => import('@/views/Auth/VerifyAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Auth/LoginView.vue'),
        }
      ]
    }
  ]
})

export default router
