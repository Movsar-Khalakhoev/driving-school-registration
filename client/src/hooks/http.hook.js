import { useState } from 'react'

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (url, method = 'get', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Что-то пошло не так...')
      }

      setLoading(false)

      return { error: !response.ok ? data.message : error, data }
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return { loading, request, error, clearError }
}

export default useHttp
