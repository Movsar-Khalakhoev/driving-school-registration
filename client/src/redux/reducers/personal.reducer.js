import {
  CHANGE_PERSONAL_MODE,
  GET_PERSON_SCHEDULE_FETCH_SUCCESS,
  GET_PERSONAL_FETCH_SUCCESS,
  GET_PERSONAL_MODES_FETCH_SUCCESS,
} from '../actionTypes'

const initialState = {
  info: {
    user: {},
  },
  schedule: {
    intervals: [],
  },
  modes: {
    modes: [],
    active: {},
  },
}

const personalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_FETCH_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          user: action.user,
        },
      }
    case GET_PERSON_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          intervals: action.schedule,
        },
      }
    case GET_PERSONAL_MODES_FETCH_SUCCESS:
      return {
        ...state,
        modes: {
          ...state.modes,
          modes: action.modes,
        },
      }
    case CHANGE_PERSONAL_MODE:
      return {
        ...state,
        modes: {
          ...state.modes,
          active: action.mode,
        },
      }
    default:
      return state
  }
}

export default personalReducer
