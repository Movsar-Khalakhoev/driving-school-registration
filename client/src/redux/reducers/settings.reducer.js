import {
  CHANGE_SETTINGS_SCHEDULE_MODE,
  GET_SETTINGS_SCHEDULE_FETCH_ERROR,
  GET_SETTINGS_SCHEDULE_FETCH_START,
  GET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
  SET_SETTINGS_CHANGED_CELLS,
  SET_SETTINGS_SCHEDULE,
  SET_SETTINGS_SCHEDULE_FETCH_ERROR,
  SET_SETTINGS_SCHEDULE_FETCH_START,
  SET_SETTINGS_SCHEDULE_FETCH_SUCCESS,
} from '../actionTypes'

const initialState = {
  schedule: {
    schedule: [],
    changedCells: [],
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

export default function settingsReducer(state = initialState, action) {
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
    default:
      return state
  }
}
