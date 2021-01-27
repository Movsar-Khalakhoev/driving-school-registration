import {
  ADD_NEW_USER_FETCH_SUCCESS,
  GET_ROLES_FETCH_SUCCESS,
  RESET_ADD_USER_STATE,
} from '../actionTypes/addUser.actionTypes'
import { errorToast, successToast } from '../../utils/toastNotifications'
import { activatePopup } from './popup.action'
import UserAdded from '../../components/Popup/Messages/UserAdded/UserAdded'
import React from 'react'

export function addNewUser(name, phone, roles, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/add-user/', 'POST', {
        name,
        phone,
        roles: [roles.value],
      })

      if (!error) {
        dispatch({
          type: ADD_NEW_USER_FETCH_SUCCESS,
          ...data.data,
        })
        successToast(data.message)
        const popup = (
          <UserAdded
            login={data.data.login}
            password={data.data.password}
            disableCancel
          />
        )
        const popupOptions = { disableCancel: true }

        dispatch(activatePopup(popup, popupOptions))
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function getRoles({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/add-user/roles')

      if (!error) {
        dispatch({
          type: GET_ROLES_FETCH_SUCCESS,
          roles: data.roles,
        })
      } else {
        errorToast(error)
      }
    } catch (e) {}
  }
}

export function resetAddUserState() {
  return {
    type: RESET_ADD_USER_STATE,
  }
}
