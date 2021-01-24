const request = async (url, method = 'get', body = null, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    const response = await fetch(url, {method, body, headers})
    const data = await response.json()

    return {
      error: response.ok ? null : data.message || 'Что-то пошло не так...',
      data
    }
  } catch (e) {
    return {
      error: 'Что-то пошло не так...',
      data: null
    }
  }
}

export default request
