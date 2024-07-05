import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('access') || ''
  config.headers.Authorization = `Bearer ${jwt}`
  return config
})

export default api
