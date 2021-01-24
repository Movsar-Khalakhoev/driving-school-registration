import {
  GET_VARIABLES_FETCH_ERROR,
  GET_VARIABLES_FETCH_START,
  GET_VARIABLES_FETCH_SUCCESS,
} from '../actionTypes'

const initialState = {
  variables: {
    maxWeeksNum: 0, // Максимальное количество недель для пролистывания
    forRentHoursInterval: [0, 0], // Интервал, в который можно бронировать время на вождение
  },
  loading: false,
  error: null,
}

export default function variablesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VARIABLES_FETCH_START:
      return {
        ...state,
        loading: true,
      }
    case GET_VARIABLES_FETCH_SUCCESS:
      return {
        ...state,
        variables: action.variables,
        loading: false,
      }
    case GET_VARIABLES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
