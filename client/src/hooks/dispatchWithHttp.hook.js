import { useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useHttp from './http.hook'
import AuthContext from '../context/AuthContext'

const useDispatchWithHttp = () => {
  const originalDispatch = useDispatch()
  const { request: requestHttp, loading, error } = useHttp()
  const authData = useContext(AuthContext)

  const request = (url, method = 'GET', body = null, headers = {}) =>
    requestHttp(url, method, body, {
      ...headers,
      Authorization: `Bearer ${authData.token}`,
    })

  const dispatch = useCallback(
    (actionCreator, args = []) =>
      originalDispatch(actionCreator(...args, { request, authData, error })),
    []
  )

  return [dispatch, loading]
}

export default useDispatchWithHttp
