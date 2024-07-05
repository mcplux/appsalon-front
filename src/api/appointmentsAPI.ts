import api from '@/lib/axios'

export default {
  create(data:any) {
    const jwt:string = localStorage.getItem('access') as string || ''
    return api.post('appointments/', data, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
  }
}
