import {
  ADD_NEW_USER_FETCH_ERROR,
  ADD_NEW_USER_FETCH_START,
  ADD_NEW_USER_FETCH_SUCCESS, GET_ROLES_FETCH_ERROR,
  GET_ROLES_FETCH_START, GET_ROLES_FETCH_SUCCESS
} from '../actionTypes'
import request from '../../services/request'
import {errorToast, successToast} from '../../utils/toastNotifications'
import {activatePopup} from './popup.action'
import UserAdded from '../../components/Popup/Messages/UserAdded/UserAdded'
import React from 'react'

export function addNewUser(name, phone, roles, token) {
  return async dispatch => {
    dispatch(addNewUserFetchStart())
    try {
      const {error, data} = await request(
        '/api/add-user',
        'POST',
        {name, phone, roles: [roles.value]},
        {
          Authorization: `Bearer ${token}`
        })

      if (!error) {
        dispatch(addNewUserFetchSuccess(data.data))
        successToast(data.message)
        const popup = <UserAdded
          login={data.data.login}
          password={data.data.password}
          disableCancel
        />
        const popupOptions = {disableCancel: true}

        dispatch(activatePopup(popup, popupOptions))
      } else {
        dispatch(addNewUserFetchError())
        errorToast(error)
      }
    } catch (e) {
      dispatch(addNewUserFetchError())
    }
  }
}

function addNewUserFetchStart() {
  return {
    type: ADD_NEW_USER_FETCH_START
  }
}

function addNewUserFetchSuccess(data) {
  return {
    type: ADD_NEW_USER_FETCH_SUCCESS,
    ...data
  }
}

function addNewUserFetchError() {
  return {
    type: ADD_NEW_USER_FETCH_ERROR
  }
}


export function getRoles(token) {
  return async dispatch => {
    dispatch(getRolesFetchStart())
    try {
      const {error, data} = await request(
        '/api/add-user/roles',
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`
        }
      )

      if (!error) {
        dispatch(getRolesFetchSuccess(data.roles))
      } else {
        dispatch(getRolesFetchError(error))
        errorToast(error)
      }
    } catch (e) {
      dispatch(getRolesFetchError(e))
    }
  }
}

export function getRolesFetchStart() {
  return {
    type: GET_ROLES_FETCH_START
  }
}

export function getRolesFetchSuccess(roles) {
  return {
    type: GET_ROLES_FETCH_SUCCESS,
    roles
  }
}

export function getRolesFetchError(error) {
  return {
    type: GET_ROLES_FETCH_ERROR,
    error
  }
}
