import {
  ACTIVATE_POPUP,
  DEACTIVATE_POPUP,
} from '../actionTypes/popup.actionTypes'

export function activatePopup(content, options) {
  return {
    type: ACTIVATE_POPUP,
    content,
    options,
  }
}

export function deactivatePopup() {
  return {
    type: DEACTIVATE_POPUP,
  }
}
