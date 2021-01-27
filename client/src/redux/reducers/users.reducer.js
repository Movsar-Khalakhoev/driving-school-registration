import {
  FILTER_USERS,
  GET_ALL_USERS_FETCH_SUCCESS,
  RESET_ALL_USERS_STATE,
} from '../actionTypes'

const initialState = {
  users: [],
  filteredUsers: [],
  inputValue: '',
}

const defaultState = { ...initialState }

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users,
      }
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: action.filteredUsers,
      }
    case RESET_ALL_USERS_STATE:
      return defaultState
    default:
      return state
  }
}
