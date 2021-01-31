import {
  GET_COMPONENTS_LIST_FETCH_SUCCESS,
  GET_VARIABLES_FETCH_SUCCESS,
  RESET_VARIABLES_STATE,
} from '../actionTypes/Variables.actionTypes'

const initialState = {
  variables: {
    maxWeeksNum: 0, // Максимальное количество недель для пролистывания
    forRentHoursInterval: [0, 0], // Интервал, в который можно бронировать время на вождение
  },
  components: {
    usersPage: false, // Страница со всеми пользователями
    addUserPage: false, // Страница добавления пользователя

    schedulePage: false, // Страница с расписанием
    rentIntervalButton: false, // Кнопка бронирования интервала на странице расписания

    userPage: false, // Страница пользователя
    deleteUserButton: false, // Кнопка удаления пользователя на странице пользователя
    removeRentButton: false, // Кнопка отмены бронирования на странице пользователя

    settingsPage: false, // Страница настроек
    instructorSchedule: false, // Возможность видеть настройки расписания у инструктора
    isEditableViewOfInstructorSchedule: false, // Возможность редактировать найстройки расписания у инструктора

    attendancePage: false, // Страница контроля посещаемости
  },
}

const defaultState = { ...initialState }

export default function variablesReducers(state = initialState, action) {
  switch (action.type) {
    case GET_VARIABLES_FETCH_SUCCESS:
      return {
        ...state,
        variables: action.variables,
      }
    case GET_COMPONENTS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        components: { ...state.components, ...action.components },
      }
    case RESET_VARIABLES_STATE:
      return defaultState
    default:
      return state
  }
}
