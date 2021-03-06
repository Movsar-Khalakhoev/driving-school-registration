import { useEffect } from 'react'
import useHttp from './http.hook'
import { resetAddUserState } from '../redux/actions/AddUserPage.actions'
import { resetScheduleState } from '../redux/actions/SchedulePage.actions'
import { resetSettingsState } from '../redux/actions/SettingsPage.actions'
import { resetPersonalState } from '../redux/actions/UserPage.actions'
import { resetAllUsersState } from '../redux/actions/UsersPage.actions'
import { resetVariablesState } from '../redux/actions/Variables.actions'
import { useDispatch } from 'react-redux'
import { resetAttendanceStateAction } from '../redux/actions/AttendancePage.actions'

const { useState } = require('react')

const storageName = 'userData'
const spareSeconds = 60

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [autoRefreshTokensInterval, setAutoRefreshTokensInterval] = useState()
  const { request } = useHttp()
  const dispatch = useDispatch()

  const login = (token, userId) => {
    setAuthData(token, userId)

    const { exp, iat } = JSON.parse(atob(token.split('.')[1]))

    setTimeout(
      () => setAutoTokenRefreshing((exp - iat - spareSeconds) * 1000),
      (exp - new Date().getTime() / 1000 - spareSeconds) * 1000
    )
  }

  const logout = async () => {
    setToken(null)
    setUserId(null)

    dispatch(resetAddUserState())
    dispatch(resetScheduleState())
    dispatch(resetSettingsState())
    dispatch(resetPersonalState())
    dispatch(resetAllUsersState())
    dispatch(resetVariablesState())
    dispatch(resetAttendanceStateAction())

    await request('/api/auth/revoke-token', 'POST')

    if (autoRefreshTokensInterval) {
      clearInterval(autoRefreshTokensInterval)
    }

    localStorage.removeItem(storageName)
  }

  const fetchAuthData = async () => {
    try {
      const { error, data } = await request('/api/auth/refresh-token', 'POST')

      if (data && data.token && data.userId) {
        setAuthData(data.token, data.userId)
      } else if (error) {
        localStorage.removeItem(storageName)
      }
    } catch (e) {}
  }

  const setAuthData = (token, userId) => {
    setToken(token)
    setUserId(userId)

    localStorage.setItem(storageName, JSON.stringify({ token, userId }))

    setIsReady(true)
  }

  const setAutoTokenRefreshing = timeout => {
    if (!timeout) return
    fetchAuthData().then(() => setIsReady(true))
    setAutoRefreshTokensInterval(setInterval(fetchAuthData, timeout))
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(storageName)) || {}

    if (userData.token && userData.userId) {
      const { exp, iat } = JSON.parse(atob(userData.token.split('.')[1]))

      if (new Date().getTime() / 1000 + spareSeconds > exp) {
        setAutoTokenRefreshing((exp - iat - spareSeconds) * 1000)
      } else {
        login(userData.token, userData.userId)
      }
    } else {
      setIsReady(true)
    }
  }, [])

  return { token, userId, login, logout, isReady }
}

export default useAuth
