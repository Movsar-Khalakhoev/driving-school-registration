import {
  CHANGE_DATE,
  CHANGE_INSTRUCTOR,
  CHANGE_PRACTICE_MODE,
  GET_SCHEDULE_FETCH_SUCCESS,
  RENT_INTERVAL_FETCH_SUCCESS,
  RESET_SCHEDULE_STATE,
} from '../actionTypes/SchedulePage.actionTypes'
import { dateWithoutTime } from '../../utils/date'

const initialState = {
  schedule: {
    schedule: [],
  },
  activeInstructor: {},
  activePracticeMode: {},
  activeDate: dateWithoutTime(),
}

const defaultState = { ...initialState }

export default function schedulePageReducers(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: action.schedule,
        },
      }
    case RENT_INTERVAL_FETCH_SUCCESS:
      const schedule = [...state.schedule.schedule]
      const idx = schedule.findIndex(
        item => item.timestamp === action.hour.timestamp
      )

      action.hour.id = schedule[idx].id
      const hour = new Date(action.hour.timestamp).getHours()
      action.hour.interval = `${hour}:00 - ${hour + 1}:00`
      schedule[idx] = action.hour

      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule,
        },
      }
    case CHANGE_PRACTICE_MODE:
      return {
        ...state,
        activePracticeMode: action.mode,
      }
    case CHANGE_INSTRUCTOR:
      return {
        ...state,
        activeInstructor: action.instructor,
      }
    case CHANGE_DATE:
      return {
        ...state,
        activeDate: action.date,
      }
    case RESET_SCHEDULE_STATE:
      return defaultState
    default:
      return state
  }
}
