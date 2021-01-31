import {
  CHANGE_SETTINGS_SCHEDULE_INSTRUCTOR,
  CHANGE_SETTINGS_SCHEDULE_MODE,
  GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  RESET_SETTINGS_STATE,
  SET_SETTINGS_CHANGED_CELLS,
  SET_SETTINGS_SCHEDULE,
  SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
} from '../actionTypes/SettingsPage.actionTypes'
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

export function changeInstructor(instructor) {
  return {
    type: CHANGE_SETTINGS_SCHEDULE_INSTRUCTOR,
    instructor,
  }
}

export function getSettingsPeriodicSchedule(
  instructor,
  isEditableView,
  { request, authData }
) {
  return async dispatch => {
    try {
      const { error, data } = await request(
        `/api/settings/${
          isEditableView ? authData.userId : instructor.value
        }/schedule/periodic`
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

export function getSettingsCurrentSchedule(
  activeWeek,
  instructor,
  isEditableView,
  { request, authData }
) {
  return async dispatch => {
    try {
      const timestamp = `${activeWeek[0].getTime()}-${activeWeek[1].getTime()}`
      const { error, data } = await request(
        `/api/settings/${
          isEditableView ? authData.userId : instructor.value
        }/schedule/current/${timestamp}`
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

export function resetSettingsState() {
  return {
    type: RESET_SETTINGS_STATE,
  }
}
