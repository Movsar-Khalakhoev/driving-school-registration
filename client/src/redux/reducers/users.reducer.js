import { FILTER_USERS, GET_ALL_USERS_FETCH_SUCCESS } from '../actionTypes'

const initialState = {
  users: [],
  filteredUsers: [],
  inputValue: '',
}

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
    default:
      return state
  }
}
