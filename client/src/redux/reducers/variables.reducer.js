import { GET_VARIABLES_FETCH_SUCCESS } from '../actionTypes'

const initialState = {
  variables: {
    maxWeeksNum: 0, // Максимальное количество недель для пролистывания
    forRentHoursInterval: [0, 0], // Интервал, в который можно бронировать время на вождение
  },
}

export default function variablesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VARIABLES_FETCH_SUCCESS:
      return {
        ...state,
        variables: action.variables,
      }
    default:
      return state
  }
}
