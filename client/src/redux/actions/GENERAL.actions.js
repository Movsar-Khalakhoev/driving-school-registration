import {
  GET_INSTRUCTORS_FETCH_SUCCESS,
  GET_PRACTICE_MODES_FETCH_SUCCESS,
} from '../actionTypes/GENERAL.actionTypes'
import { errorToast } from '../../utils/toastNotifications'

export function getInstructors({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/general/instructors')

      if (!error) {
        dispatch({
          type: GET_INSTRUCTORS_FETCH_SUCCESS,
          instructors: data.instructors,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function getPracticeModes({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/general/practice-modes')

      if (!error) {
        dispatch({
          type: GET_PRACTICE_MODES_FETCH_SUCCESS,
          practiceModes: data.practiceModes,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}
