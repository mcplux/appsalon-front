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
  },
  getById(id:string) {
    return api.get(`appointments/${id}/`)
  },
  update(id:string, data:any) {
    return api.put(`appointments/${id}/`, data)
  }
}
