import {
  GET_INSTRUCTORS_FETCH_SUCCESS,
  GET_PRACTICE_MODES_FETCH_SUCCESS,
} from '../actionTypes/GENERAL.actionTypes'

const initialState = {
  practiceModes: [],
  instructors: [],
}

export default function generalReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INSTRUCTORS_FETCH_SUCCESS:
      return {
        ...state,
        instructors: action.instructors,
      }
    case GET_PRACTICE_MODES_FETCH_SUCCESS:
      return {
        ...state,
        practiceModes: action.practiceModes,
      }
    default:
      return state
  }
}
