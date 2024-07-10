import api from '@/lib/axios'

export default {
  create(data:any) {
    return api.post('appointments/', data)
  },
  getByDate(date:string) {
    return api.get(`appointments/?date=${date}`)
  },
  getUserAppointments() {
    return api.get('auth/user/appointments')
  }
}
