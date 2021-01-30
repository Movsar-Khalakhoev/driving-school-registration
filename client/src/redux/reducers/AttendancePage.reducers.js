import {
  CHANGE_MODE,
  FETCH_STUDENTS_LIST,
  RESET_ATTENDANCE_STATE,
  SET_STUDENT_ATTEND,
} from '../actionTypes/AttendancePage.actionTypes'

const initialState = {
  studentsList: [],
  modes: [
    { value: 'all', label: 'Все' },
    { value: 'marked', label: 'Только отмеченные' },
    { value: 'no-marked', label: 'Только неотмеченные' },
  ],
  activeMode: { value: 'all', label: 'Все' },
}

const defaultState = {
  studentsList: [],
  modes: [
    { value: 'all', label: 'Все' },
    { value: 'marked', label: 'Только отмеченные' },
    { value: 'no-marked', label: 'Только неотмеченные' },
  ],
  activeMode: { value: 'all', label: 'Все' },
}

export default function attendancePageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS_LIST:
      return {
        ...state,
        studentsList: action.studentsList,
      }
    case CHANGE_MODE:
      return {
        ...state,
        activeMode: action.mode,
      }
    case SET_STUDENT_ATTEND:
      const updatedStudentsList = state.studentsList.map(student => {
        if (student.id === action.id) {
          if (action.isAttend === null) {
            student.isAttend = null
          } else {
            student.isAttend = action.isAttend
          }
        }

        return student
      })

      return {
        ...state,
        studentsList: updatedStudentsList,
      }
    case RESET_ATTENDANCE_STATE:
      return defaultState
    default:
      return state
  }
}
