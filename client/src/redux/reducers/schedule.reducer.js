import {
  CHANGE_DATE,
  CHANGE_INSTRUCTOR,
  CHANGE_PRACTICE_MODE,
  GET_INSTRUCTORS_FETCH_SUCCESS,
  GET_PRACTICE_MODES_FETCH_SUCCESS,
  GET_SCHEDULE_FETCH_SUCCESS,
  RENT_INTERVAL_FETCH_SUCCESS,
} from '../actionTypes'
import { dateWithoutTime } from '../../utils/date'

const initialState = {
  schedule: {
    schedule: [],
  },
  instructors: {
    instructors: [],
    active: {},
  },
  practiceModes: {
    practiceModes: [],
    active: {},
  },
  date: {
    active: dateWithoutTime(),
  },
}

export default function scheduleReducer(state = initialState, action) {
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
    case GET_INSTRUCTORS_FETCH_SUCCESS:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          instructors: action.instructors,
        },
      }
    case GET_PRACTICE_MODES_FETCH_SUCCESS:
      return {
        ...state,
        practiceModes: {
          ...state.practiceModes,
          practiceModes: action.practiceModes,
        },
      }
    case CHANGE_PRACTICE_MODE:
      return {
        ...state,
        practiceModes: {
          ...state.practiceModes,
          active: action.mode,
        },
      }
    case CHANGE_INSTRUCTOR:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          active: action.instructor,
        },
      }
    case CHANGE_DATE:
      return {
        ...state,
        date: {
          ...state.date,
          active: action.date,
        },
      }
    default:
      return state
  }
}
