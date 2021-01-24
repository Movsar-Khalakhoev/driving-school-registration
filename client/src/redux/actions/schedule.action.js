import {
  CHANGE_INSTRUCTOR,
  CHANGE_PRACTICE_MODE,
  GET_INSTRUCTORS_FETCH_ERROR,
  GET_INSTRUCTORS_FETCH_START,
  GET_INSTRUCTORS_FETCH_SUCCESS,
  GET_PRACTICE_MODES_FETCH_ERROR,
  GET_PRACTICE_MODES_FETCH_START,
  GET_PRACTICE_MODES_FETCH_SUCCESS,
  GET_SCHEDULE_FETCH_ERROR,
  GET_SCHEDULE_FETCH_START,
  GET_SCHEDULE_FETCH_SUCCESS,
  RENT_INTERVAL_FETCH_ERROR,
  RENT_INTERVAL_FETCH_START,
  RENT_INTERVAL_FETCH_SUCCESS,
} from '../actionTypes'
import request from '../../services/request'
import normalizeSchedule from '../../utils/normalizeSchedule'
import { errorToast, successToast } from '../../utils/toastNotifications'

export function getSchedule(date, practiceMode, instructor, token) {
  return async (dispatch, getState) => {
    dispatch(getScheduleFetchStart())
    try {
      const changedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
      const { forRentHoursInterval } = getState().variables.variables

      const { error, data } = await request(
        `/api/schedule/${changedDate}/${instructor}/${practiceMode}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        const schedule = normalizeSchedule(
          forRentHoursInterval,
          date,
          data.schedule,
          data.hoursToRent
        )
        dispatch(getScheduleFetchSuccess(schedule))
      } else {
        dispatch(getScheduleFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getScheduleFetchError(e))
    }
  }
}

function getScheduleFetchStart() {
  return {
    type: GET_SCHEDULE_FETCH_START,
  }
}

function getScheduleFetchSuccess(schedule) {
  return {
    type: GET_SCHEDULE_FETCH_SUCCESS,
    schedule,
  }
}

function getScheduleFetchError(error) {
  return {
    type: GET_SCHEDULE_FETCH_ERROR,
    error,
  }
}

export function rentInterval(instructor, practiceMode, timestamp, token) {
  return async dispatch => {
    dispatch(rentIntervalFetchStart())
    try {
      const { error, data } = await request(
        '/api/schedule',
        'POST',
        {
          timestamp,
          instructor,
          practiceMode,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(rentIntervalFetchSuccess(data.hour))
        successToast(data.message)
      } else {
        dispatch(rentIntervalFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(rentIntervalFetchError(e))
      errorToast(e.message)
    }
  }
}

function rentIntervalFetchStart() {
  return {
    type: RENT_INTERVAL_FETCH_START,
  }
}

function rentIntervalFetchSuccess(hour) {
  return {
    type: RENT_INTERVAL_FETCH_SUCCESS,
    hour,
  }
}

function rentIntervalFetchError(error) {
  return {
    type: RENT_INTERVAL_FETCH_ERROR,
    error,
  }
}

export function getInstructors(token) {
  return async dispatch => {
    dispatch(getInstructorsFetchStart())
    try {
      const { error, data } = await request(
        '/api/schedule/instructors',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(getInstructorsFetchSuccess(data.instructors))
      } else {
        dispatch(getInstructorsFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getInstructorsFetchError(e))
    }
  }
}

function getInstructorsFetchStart() {
  return {
    type: GET_INSTRUCTORS_FETCH_START,
  }
}

function getInstructorsFetchSuccess(instructors) {
  return {
    type: GET_INSTRUCTORS_FETCH_SUCCESS,
    instructors,
  }
}

function getInstructorsFetchError(error) {
  return {
    type: GET_INSTRUCTORS_FETCH_ERROR,
    error,
  }
}

export function getPracticeModes(token) {
  return async dispatch => {
    dispatch(getPracticeModesFetchStart())
    try {
      const { error, data } = await request(
        '/api/schedule/practice-modes',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!error) {
        dispatch(getPracticeModesFetchSuccess(data.practiceModes))
      } else {
        dispatch(getPracticeModesFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getPracticeModesFetchError(e))
    }
  }
}

function getPracticeModesFetchStart() {
  return {
    type: GET_PRACTICE_MODES_FETCH_START,
  }
}

function getPracticeModesFetchSuccess(practiceModes) {
  return {
    type: GET_PRACTICE_MODES_FETCH_SUCCESS,
    practiceModes,
  }
}

function getPracticeModesFetchError(error) {
  return {
    type: GET_PRACTICE_MODES_FETCH_ERROR,
    error,
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
