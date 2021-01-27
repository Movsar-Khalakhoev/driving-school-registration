import { GET_VARIABLES_FETCH_SUCCESS } from '../actionTypes'

export function getVariables(token, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/variables', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })

      if (!error) {
        dispatch({
          type: GET_VARIABLES_FETCH_SUCCESS,
          variables: data.variables,
        })
      } else {
      }
    } catch (e) {}
  }
}
