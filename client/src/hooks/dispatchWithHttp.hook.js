import { useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useHttp from './http.hook'
import AuthContext from '../context/AuthContext'

const useDispatchWithHttp = () => {
  const originalDispatch = useDispatch()
  const { request: requestHttp, loading, error } = useHttp()
  const authData = useContext(AuthContext)

  const request = (url, method = 'GET', body = null, headers = {}) => {
    return requestHttp(url, method, body, {
      Authorization: `Bearer ${authData.token}`,
      ...headers,
    })
  }

  const dispatch = useCallback(
    (actionCreator, args = [], executedFunction = () => {}) =>
      originalDispatch(
        actionCreator(...args, {
          request,
          authData,
          error,
          executedFunction,
        })
      ),
    []
  )

  return [dispatch, loading]
}

export default useDispatchWithHttp
