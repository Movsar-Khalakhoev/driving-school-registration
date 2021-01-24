import {
  ADD_NEW_USER_FETCH_ERROR,
  ADD_NEW_USER_FETCH_START,
  ADD_NEW_USER_FETCH_SUCCESS,
  GET_ROLES_FETCH_ERROR,
  GET_ROLES_FETCH_START,
  GET_ROLES_FETCH_SUCCESS
} from '../actionTypes'

const initialState = {
  addUser: {
    login: '',
    password: '',
    loading: false,
    error: null
  },
  roles: {
    roles: [],
    loading: false,
    error: null
  }
}

const addNewUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_USER_FETCH_START:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          loading: true
        }
      }
    case ADD_NEW_USER_FETCH_SUCCESS:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          loading: false,
          login: action.login,
          password: action.password
        }
      }
    case ADD_NEW_USER_FETCH_ERROR:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          loading: false,
          error: action.error
        }
      }
    case GET_ROLES_FETCH_START:
      return {
        ...state,
        roles: {
          ...state.roles,
          loading: true
        }
      }
    case GET_ROLES_FETCH_SUCCESS:
      return {
        ...state,
        roles: {
          ...state.roles,
          roles: action.roles,
          loading: false
        }
      }
    case GET_ROLES_FETCH_ERROR:
      return {
        ...state,
        roles: {
          ...state.roles,
          loading: false,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default addNewUserReducer
