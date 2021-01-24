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

const initialState = {
  schedule: {
    schedule: [],
    loading: false,
    error: null,
  },
  instructors: {
    instructors: [],
    active: {},
    loading: false,
    error: null,
  },
  practiceModes: {
    practiceModes: [],
    active: {},
    loading: false,
    error: null,
  },
}

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULE_FETCH_START:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: true,
        },
      }
    case GET_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: action.schedule,
          loading: false,
        },
      }
    case GET_SCHEDULE_FETCH_ERROR:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          error: action.error,
          loading: false,
        },
      }

    case RENT_INTERVAL_FETCH_START:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: true,
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
          loading: false,
        },
      }
    case RENT_INTERVAL_FETCH_ERROR:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          error: action.error,
          loading: false,
        },
      }

    case GET_INSTRUCTORS_FETCH_START:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          loading: true,
        },
      }
    case GET_INSTRUCTORS_FETCH_SUCCESS:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          instructors: action.instructors,
          loading: false,
        },
      }
    case GET_INSTRUCTORS_FETCH_ERROR:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          error: action.error,
          loading: false,
        },
      }

    case GET_PRACTICE_MODES_FETCH_START:
      return {
        ...state,
        practiceModes: {
          ...state.practiceModes,
          loading: true,
        },
      }
    case GET_PRACTICE_MODES_FETCH_SUCCESS:
      return {
        ...state,
        practiceModes: {
          ...state.practiceModes,
          practiceModes: action.practiceModes,
          loading: false,
        },
      }
    case GET_PRACTICE_MODES_FETCH_ERROR:
      return {
        ...state,
        practiceModes: {
          ...state.practiceModes,
          error: action.error,
          loading: false,
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
    default:
      return state
  }
}
