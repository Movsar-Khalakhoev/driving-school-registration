import {
  CHANGE_SETTINGS_SCHEDULE_INSTRUCTOR,
  CHANGE_SETTINGS_SCHEDULE_MODE,
  GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  RESET_SETTINGS_STATE,
  SET_SETTINGS_CHANGED_CELLS,
  SET_SETTINGS_SCHEDULE,
  SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
} from '../actionTypes/SettingsPage.actionTypes'

const initialState = {
  schedule: {
    schedule: [],
    changedCells: [],
    activeInstructor: {},
    modes: [
      { label: 'Периодический', value: 'periodic' },
      { label: 'Текущий', value: 'current' },
    ],
    weekDayLabels: [
      ['Понедельник', 'ПН'],
      ['Вторник', 'ВТ'],
      ['Среда', 'СР'],
      ['Четверг', 'ЧТ'],
      ['Пятница', 'ПТ'],
      ['Суббота', 'СБ'],
      ['Воскресенье', 'ВС'],
    ],
    activeMode: { label: 'Текущий', value: 'current' },
  },
}

const defaultState = { ...initialState }

export default function settingsPageReducers(state = initialState, action) {
  switch (action.type) {
    case SET_SETTINGS_SCHEDULE:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: action.schedule,
        },
      }
    case SET_SETTINGS_CHANGED_CELLS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          changedCells: action.changedCells,
        },
      }
    case CHANGE_SETTINGS_SCHEDULE_MODE:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          changedCells: [],
          activeMode: action.mode,
        },
      }
    case CHANGE_SETTINGS_SCHEDULE_INSTRUCTOR:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          activeInstructor: action.instructor,
        },
      }
    case GET_SETTINGS_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: action.schedule,
        },
      }
    case SET_SETTINGS_SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          changedCells: [],
        },
      }
    case RESET_SETTINGS_STATE:
      return defaultState
    default:
      return state
  }
}
