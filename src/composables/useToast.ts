import { useToast as useToastNotification } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export default function useToast() {
  const toast = useToastNotification({
    position: 'top-right',
    duration: 3000,
  })

  function openToast(message:string, type:string = 'success') {
    toast.open({
      message,
      type,
    })
  }

  return {
    openToast,
  }
}
