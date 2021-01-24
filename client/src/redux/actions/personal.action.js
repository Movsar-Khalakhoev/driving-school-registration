import {
  CHANGE_PERSONAL_MODE,
  GET_PERSON_SCHEDULE_FETCH_ERROR,
  GET_PERSON_SCHEDULE_FETCH_START,
  GET_PERSON_SCHEDULE_FETCH_SUCCESS,
  GET_PERSONAL_FETCH_ERROR,
  GET_PERSONAL_FETCH_START,
  GET_PERSONAL_FETCH_SUCCESS,
  GET_PERSONAL_MODES_FETCH_ERROR,
  GET_PERSONAL_MODES_FETCH_START,
  GET_PERSONAL_MODES_FETCH_SUCCESS,
} from '../actionTypes'
import request from '../../services/request'
import { errorToast } from '../../utils/toastNotifications'

export function getPersonal(token, userId) {
  return async dispatch => {
    dispatch(getPersonalFetchStart())
    try {
      const { error, data } = await request(
        `/api/users/${userId}`,
        'get',
        null,
        { Authorization: `Bearer ${token}` }
      )

      if (!error) {
        dispatch(getPersonalFetchSuccess(data.user))
      } else {
        dispatch(getPersonalFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getPersonalFetchError(e))
    }
  }
}

function getPersonalFetchStart() {
  return {
    type: GET_PERSONAL_FETCH_START,
  }
}

function getPersonalFetchSuccess(user) {
  return {
    type: GET_PERSONAL_FETCH_SUCCESS,
    user,
  }
}

function getPersonalFetchError(error) {
  return {
    type: GET_PERSONAL_FETCH_ERROR,
    error,
  }
}

export function getPersonSchedule(mode, token, userId) {
  return async dispatch => {
    dispatch(getPersonScheduleFetchStart())
    try {
      const { error, data } = await request(
        `/api/users/${userId}/${mode}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(getPersonScheduleFetchSuccess(data.schedule))
      } else {
        dispatch(getPersonScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getPersonScheduleFetchError(e))
    }
  }
}

function getPersonScheduleFetchStart() {
  return {
    type: GET_PERSON_SCHEDULE_FETCH_START,
  }
}

function getPersonScheduleFetchSuccess(schedule) {
  return {
    type: GET_PERSON_SCHEDULE_FETCH_SUCCESS,
    schedule,
  }
}

function getPersonScheduleFetchError(error) {
  return {
    type: GET_PERSON_SCHEDULE_FETCH_ERROR,
    error,
  }
}

export function getPersonalModes(token) {
  return async dispatch => {
    dispatch(getPersonalModesFetchStart())
    try {
      const { error, data } = await request('/api/users/modes', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })

      if (!error) {
        dispatch(getPersonalModesFetchSuccess(data.modes))
      } else {
        dispatch(getPersonalModesFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getPersonalModesFetchError())
    }
  }
}

function getPersonalModesFetchStart() {
  return {
    type: GET_PERSONAL_MODES_FETCH_START,
  }
}

function getPersonalModesFetchSuccess(modes) {
  return {
    type: GET_PERSONAL_MODES_FETCH_SUCCESS,
    modes,
  }
}

function getPersonalModesFetchError(error) {
  return {
    type: GET_PERSONAL_MODES_FETCH_ERROR,
    error,
  }
}

export function changePersonalMode(mode) {
  return {
    type: CHANGE_PERSONAL_MODE,
    mode,
  }
}
