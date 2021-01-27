import {
  FILTER_USERS,
  GET_ALL_USERS_FETCH_SUCCESS,
  RESET_ALL_USERS_STATE,
} from '../actionTypes'
import { errorToast } from '../../utils/toastNotifications'

export function getAllUsers({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/users')

      if (!error) {
        dispatch({
          type: GET_ALL_USERS_FETCH_SUCCESS,
          users: data.users,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function filterUsers(users, filters = {}) {
  const filteredUsers = users.filter(user =>
    user.name.includes(filters.inputValue)
  )
  return {
    type: FILTER_USERS,
    filteredUsers,
  }
}

export function resetAllUsersState() {
  return {
    type: RESET_ALL_USERS_STATE,
  }
}
