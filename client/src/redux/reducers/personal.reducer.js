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
  GET_PERSONAL_MODES_FETCH_SUCCESS
} from '../actionTypes'

const initialState = {
  info: {
    user: {},
    loading: false,
    error: null
  },
  schedule: {
    intervals: [],
    loading: false,
    error: null
  },
  modes: {
    modes: [],
    active: {},
    loading: false,
    error: null
  }
}

const personalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_FETCH_START:
      return {
        ...state,
        info: {
          ...state.info,
          loading: true
        }
      }
    case GET_PERSONAL_FETCH_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          user: action.user,
          loading: false
        }
      }
    case GET_PERSONAL_FETCH_ERROR:
      return {
        ...state,
        info: {
          ...state.info,
          loading: false,
          error: action.error
        }
      }
    case GET_PERSON_SCHEDULE_FETCH_START:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: true
        }
      }
    case GET_PERSON_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          intervals: action.schedule,
          loading: false
        }
      }
    case GET_PERSON_SCHEDULE_FETCH_ERROR:
        return {
          ...state,
          schedule: {
            ...state.schedule,
            loading: false,
            error: action.error
          }
        }
    case GET_PERSONAL_MODES_FETCH_START:
      return {
        ...state,
        modes: {
          ...state.modes,
          loading: true
        }
      }
    case GET_PERSONAL_MODES_FETCH_SUCCESS:
      return {
        ...state,
        modes: {
          ...state.modes,
          modes: action.modes,
          loading: false
        }
      }
    case GET_PERSONAL_MODES_FETCH_ERROR:
      return {
        ...state,
        modes: {
          ...state.modes,
          loading: false,
          error: action.error
        }
      }

    case CHANGE_PERSONAL_MODE:
      return {
        ...state,
        modes: {
          ...state.modes,
          active: action.mode
        }
      }
    default:
      return state
  }
}

export default personalReducer
