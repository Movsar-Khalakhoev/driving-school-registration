import {toast} from 'react-toastify'

toast.configure({
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
})

export const successToast = (str = 'Успех!') => {
  toast.success(str)
}

export const errorToast = (str = 'Ошибка!') => {
  toast.error(str)
}
