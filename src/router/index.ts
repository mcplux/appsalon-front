import { createRouter, createWebHistory } from 'vue-router'
import authAPI from '@/api/authAPI'
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
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/Appointments/MyAppointmentsView.vue'),
        },
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
        },
        {
          path: ':id/edit',
          component: () => import('@/views/Appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('@/views/Appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'edit-appointment-details',
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    try {
      const { data } = await authAPI.user()
    } catch (error:any) {
      localStorage.removeItem('access')
      next({ name: 'login' })
    }
  }
  next()
})

export default router
