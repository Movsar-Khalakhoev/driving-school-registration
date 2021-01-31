import {
  CHANGE_DATE,
  CHANGE_INSTRUCTOR,
  CHANGE_PRACTICE_MODE,
  GET_SCHEDULE_FETCH_SUCCESS,
  RENT_INTERVAL_FETCH_SUCCESS,
  RESET_SCHEDULE_STATE,
} from '../actionTypes/SchedulePage.actionTypes'
import normalizeSchedule from '../../utils/normalizeSchedule'
import { errorToast, successToast } from '../../utils/toastNotifications'

export function getSchedule(date, practiceMode, instructor, { request }) {
  return async (dispatch, getState) => {
    try {
      const changedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
      const { forRentHoursInterval } = getState().variables.variables

      const { error, data } = await request(
        `/api/schedule/${changedDate}/${instructor}/${practiceMode}`
      )

      if (!error) {
        const schedule = normalizeSchedule(
          forRentHoursInterval,
          date,
          data.schedule,
          data.hoursToRent
        )
        dispatch({
          type: GET_SCHEDULE_FETCH_SUCCESS,
          schedule,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function rentInterval(instructor, practiceMode, timestamp, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/schedule', 'POST', {
        timestamp,
        instructor,
        practiceMode,
      })

      if (!error) {
        dispatch({
          type: RENT_INTERVAL_FETCH_SUCCESS,
          hour: data.hour,
        })
        successToast(data.message)
      } else {
        errorToast(error)
      }
    } catch (e) {
      errorToast(e.message)
    }
  }
}

export function changePracticeMode(mode) {
  return {
    type: CHANGE_PRACTICE_MODE,
    mode,
  }
}

export function changeInstructor(instructor) {
  return {
    type: CHANGE_INSTRUCTOR,
    instructor,
  }
}

export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    date,
  }
}

export function resetScheduleState() {
  return {
    type: RESET_SCHEDULE_STATE,
  }
}
