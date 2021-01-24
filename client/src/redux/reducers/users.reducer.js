import {
  FILTER_USERS,
  GET_ALL_USERS_FETCH_ERROR,
  GET_ALL_USERS_FETCH_START,
  GET_ALL_USERS_FETCH_SUCCESS
} from '../actionTypes'

const initialState = {
  users: [],
  filteredUsers: [],
  inputValue: '',
  loading: false,
  error: null
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_FETCH_START:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users,
        loading: false
      }
    case GET_ALL_USERS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: action.filteredUsers
      }
    default:
      return state
  }
}
