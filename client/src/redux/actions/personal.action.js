import {
  CHANGE_PERSONAL_MODE,
  DELETE_PERSONAL_RENT_INTERVAL,
  GET_PERSON_SCHEDULE_FETCH_SUCCESS,
  GET_PERSONAL_FETCH_SUCCESS,
  GET_PERSONAL_MODES_FETCH_SUCCESS,
  RESET_PERSONAL_STATE,
} from '../actionTypes'
import { errorToast, successToast } from '../../utils/toastNotifications'

export function getPersonal(userId, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request(`/api/users/${userId}`)

      if (!error) {
        dispatch({
          type: GET_PERSONAL_FETCH_SUCCESS,
          user: data.user,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function getPersonSchedule(mode, userId, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request(`/api/users/${userId}/${mode}`)

      if (!error) {
        dispatch({
          type: GET_PERSON_SCHEDULE_FETCH_SUCCESS,
          schedule: data.schedule,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function getPersonalModes({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/users/modes')

      if (!error) {
        dispatch({
          type: GET_PERSONAL_MODES_FETCH_SUCCESS,
          modes: data.modes,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function changePersonalMode(mode) {
  return {
    type: CHANGE_PERSONAL_MODE,
    mode,
  }
}

export function deleteUser(userId, { request, executedFunction }) {
  return async () => {
    try {
      const { error, data } = await request(`/api/users/delete-user/${userId}`)

      if (!error) {
        successToast(data.message)
        executedFunction()
      } else {
        errorToast(data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteRentRequest(timestamp, { request }) {
  return async dispatch => {
    try {
      const test = await request('/api/users/delete-rent', 'POST', {
        timestamp,
      })

      console.log(test.error, test.data)
      if (!test.error) {
        successToast(test.data.message)
        dispatch(deleteRentInStore(timestamp))
      } else {
        errorToast(test.error)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function deleteRentInStore(timestamp) {
  return {
    type: DELETE_PERSONAL_RENT_INTERVAL,
    timestamp,
  }
}

export function resetPersonalState() {
  return {
    type: RESET_PERSONAL_STATE,
  }
}
