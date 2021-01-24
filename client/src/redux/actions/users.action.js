import {
  FILTER_USERS,
  GET_ALL_USERS_FETCH_ERROR,
  GET_ALL_USERS_FETCH_START,
  GET_ALL_USERS_FETCH_SUCCESS
} from '../actionTypes'
import request from '../../services/request'
import {errorToast} from '../../utils/toastNotifications'

export function getAllUsers(token) {
  return async dispatch => {
    dispatch(getAllUsersFetchStart())
    try {
      const {error, data} = await request(
        '/api/users',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`
        }
      )

      if (!error) {
        dispatch(getAllUsersFetchSuccess(data.users))
      } else {
        dispatch(getAllUsersFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getAllUsersFetchError(e))
    }
  }
}

function getAllUsersFetchStart() {
  return {
    type: GET_ALL_USERS_FETCH_START
  }
}

function getAllUsersFetchSuccess(users) {
  return {
    type: GET_ALL_USERS_FETCH_SUCCESS,
    users
  }
}

function getAllUsersFetchError() {
  return {
    type: GET_ALL_USERS_FETCH_ERROR
  }
}


export function filterUsers(users, filters = {}) {
  const filteredUsers = users.filter(user => user.name.includes(filters.inputValue))
  return {
    type: FILTER_USERS,
    filteredUsers
  }
}
