import {
  CHANGE_SETTINGS_SCHEDULE_MODE,
  GET_SETTINGS_SCHEDULE_FETCH_ERROR,
  GET_SETTINGS_SCHEDULE_FETCH_START,
  GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  SET_SETTINGS_CHANGED_CELLS,
  SET_SETTINGS_SCHEDULE,
  SET_SETTINGS_SCHEDULE_FETCH_ERROR,
  SET_SETTINGS_SCHEDULE_FETCH_START,
  SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
} from '../actionTypes'
import request from '../../services/request'
import { errorToast, successToast } from '../../utils/toastNotifications'

export function setSchedule(schedule) {
  return {
    type: SET_SETTINGS_SCHEDULE,
    schedule,
  }
}

export function setChangedCells(changedCells) {
  return {
    type: SET_SETTINGS_CHANGED_CELLS,
    changedCells,
  }
}

export function changeMode(mode) {
  return {
    type: CHANGE_SETTINGS_SCHEDULE_MODE,
    mode,
  }
}

export function getSettingsPeriodicSchedule(token) {
  return async (dispatch) => {
    dispatch(getSettingsScheduleFetchStart())
    try {
      const { error, data } = await request(
        '/api/settings/schedule/periodic',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(getSettingsScheduleFetchSuccess(data.schedule))
      } else {
        dispatch(getSettingsScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getSettingsScheduleFetchError(e))
    }
  }
}

export function getSettingsCurrentSchedule(token, interval) {
  return async (dispatch) => {
    dispatch(getSettingsScheduleFetchStart())
    try {
      const timestamp = `${interval[0].getTime()}-${interval[1].getTime()}`
      const { error, data } = await request(
        `/api/settings/schedule/current/${timestamp}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(getSettingsScheduleFetchSuccess(data.schedule))
      } else {
        dispatch(getSettingsScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getSettingsScheduleFetchError(e))
    }
  }
}

function getSettingsScheduleFetchStart() {
  return {
    type: GET_SETTINGS_SCHEDULE_FETCH_START,
  }
}

function getSettingsScheduleFetchSuccess(schedule) {
  return {
    type: GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
    schedule,
  }
}

function getSettingsScheduleFetchError(error) {
  return {
    type: GET_SETTINGS_SCHEDULE_FETCH_ERROR,
    error,
  }
}

export function setSettingsPeriodicSchedule(changed, token) {
  return async (dispatch) => {
    dispatch(setSettingsScheduleFetchStart())
    try {
      const { error, data } = await request(
        '/api/settings/schedule/periodic',
        'POST',
        {
          changed: changed,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(setSettingsScheduleFetchSuccess())
        successToast(data.message)
      } else {
        dispatch(setSettingsScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(setSettingsScheduleFetchError(e))
    }
  }
}

export function setSettingsCurrentSchedule(changed, start, token) {
  return async (dispatch) => {
    dispatch(setSettingsScheduleFetchStart())
    try {
      start = new Date(start)
      changed = changed.map((item) => {
        item.timestamp = new Date(
          new Date(
            new Date(start).setDate(start.getDate() + item.weekDay - 1)
          ).setHours(item.hour)
        ).toISOString()

        return item
      })
      const { error, data } = await request(
        '/api/settings/schedule/current',
        'POST',
        {
          changed,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(setSettingsScheduleFetchSuccess())
        successToast(data.message)
      } else {
        dispatch(setSettingsScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(setSettingsScheduleFetchError(e))
    }
  }
}

function setSettingsScheduleFetchStart() {
  return {
    type: SET_SETTINGS_SCHEDULE_FETCH_START,
  }
}

function setSettingsScheduleFetchSuccess() {
  return {
    type: SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  }
}

function setSettingsScheduleFetchError(error) {
  return {
    type: SET_SETTINGS_SCHEDULE_FETCH_ERROR,
    error,
  }
}
