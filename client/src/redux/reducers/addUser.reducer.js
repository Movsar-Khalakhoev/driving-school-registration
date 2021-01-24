import {
  ADD_NEW_USER_FETCH_SUCCESS,
  GET_ROLES_FETCH_SUCCESS,
} from '../actionTypes'

const initialState = {
  addUser: {
    login: '',
    password: '',
  },
  roles: {
    roles: [],
  },
}

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
    default:
      return state
  }
}

export default addNewUserReducer
