import {
  CHANGE_SETTINGS_SCHEDULE_MODE,
  GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  SET_SETTINGS_CHANGED_CELLS,
  SET_SETTINGS_SCHEDULE,
  SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
} from '../actionTypes'
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

export function getSettingsPeriodicSchedule({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/settings/schedule/periodic')

      if (!error) {
        dispatch({
          type: GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
          schedule: data.schedule,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function getSettingsCurrentSchedule(activeWeek, { request }) {
  return async dispatch => {
    try {
      const timestamp = `${activeWeek[0].getTime()}-${activeWeek[1].getTime()}`
      const { error, data } = await request(
        `/api/settings/schedule/current/${timestamp}`
      )

      if (!error) {
        dispatch({
          type: GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
          schedule: data.schedule,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function setSettingsPeriodicSchedule(changed, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request(
        '/api/settings/schedule/periodic',
        'POST',
        {
          changed: changed,
        }
      )

      console.log(data)
      if (!error) {
        dispatch({
          type: GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
          schedule: data.schedule,
        })
        successToast(data.message)
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function setSettingsCurrentSchedule(changed, start, { request }) {
  return async dispatch => {
    try {
      start = new Date(start)
      changed = changed.map(item => {
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
        }
      )

      if (!error) {
        dispatch({
          type: SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
        })
        successToast(data.message)
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}
