import {
  GET_VARIABLES_FETCH_ERROR,
  GET_VARIABLES_FETCH_START,
  GET_VARIABLES_FETCH_SUCCESS,
} from '../actionTypes'
import request from '../../services/request'

export function getVariables(token) {
  return async (dispatch) => {
    dispatch(getVariablesFetchStart())
    try {
      const { error, data } = await request('/api/variables', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })

      if (!error) {
        dispatch(getVariablesFetchSuccess(data.variables))
      } else {
        dispatch(getVariablesFetchError(error))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function getVariablesFetchStart() {
  return {
    type: GET_VARIABLES_FETCH_START,
  }
}

function getVariablesFetchSuccess(variables) {
  return {
    type: GET_VARIABLES_FETCH_SUCCESS,
    variables,
  }
}

function getVariablesFetchError(error) {
  return {
    type: GET_VARIABLES_FETCH_ERROR,
    error,
  }
}
