import {useEffect} from 'react'

const {useState} = require('react')

const storageName = 'userData'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const login = (token, userId) => {
    setToken(token)
    setUserId(userId)

    localStorage.setItem(storageName, JSON.stringify({token, userId}))
  }

  const logout = () => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token && data.userId) {
      login(data.token, data.userId)
    }

    setIsReady(true)
  }, [])

  return {token, userId, login, logout, isReady}
}

export default useAuth
