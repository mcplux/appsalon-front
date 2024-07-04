import api from '@/lib/axios'

interface FormDataType {
  first_name?: string
  email: string
  password?: string
}

export default {
  register(data:FormDataType) {
    return api.post('auth/register/', data)
  }
}
