import {
  ADD_NEW_USER_FETCH_SUCCESS,
  GET_ROLES_FETCH_SUCCESS,
  RESET_ADD_USER_STATE,
} from '../actionTypes/addUser.actionTypes'

const initialState = {
  addUser: {
    login: '',
    password: '',
  },
  roles: {
    roles: [],
  },
}

const defaultState = { ...initialState }

const addNewUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_USER_FETCH_SUCCESS:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          login: action.login,
          password: action.password,
        },
      }
    case GET_ROLES_FETCH_SUCCESS:
      return {
        ...state,
        roles: {
          ...state.roles,
          roles: action.roles,
        },
      }
    case RESET_ADD_USER_STATE:
      return defaultState
    default:
      return state
  }
}

export default addNewUserReducer
