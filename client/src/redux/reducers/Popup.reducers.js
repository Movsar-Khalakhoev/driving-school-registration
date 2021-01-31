import {
  ACTIVATE_POPUP,
  DEACTIVATE_POPUP,
} from '../actionTypes/Popup.actionTypes'

const initialState = {
  isActive: false,
  content: '',
  options: {},
}

const popupReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_POPUP:
      return {
        ...state,
        content: action.content,
        options: action.options,
        isActive: true,
      }
    case DEACTIVATE_POPUP:
      return {
        ...state,
        content: '',
        options: {},
        isActive: false,
      }
    default:
      return state
  }
}

export default popupReducers
