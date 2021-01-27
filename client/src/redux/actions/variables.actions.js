import {
  GET_COMPONENTS_LIST_FETCH_SUCCESS,
  GET_VARIABLES_FETCH_SUCCESS,
  RESET_VARIABLES_STATE,
} from '../actionTypes'

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

export function getComponentsList(token, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request(
        '/api/variables/components',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch({
          type: GET_COMPONENTS_LIST_FETCH_SUCCESS,
          components: data.components,
        })
      }
    } catch (e) {}
  }
}

export function resetVariablesState() {
  return {
    type: RESET_VARIABLES_STATE,
  }
}
