import {
  CHANGE_MODE,
  FETCH_STUDENTS_LIST,
  RESET_ATTENDANCE_STATE,
  SET_STUDENT_ATTEND,
} from '../actionTypes/AttendancePage.actionTypes'
import { errorToast } from '../../utils/toastNotifications'

export function fetchStudentsListAction({ request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/attendance')

      if (!error) {
        dispatch({ type: FETCH_STUDENTS_LIST, studentsList: data.students })
      }
    } catch (e) {}
  }
}

export function setStudentAttendAction(id, isAttend, { request }) {
  return async dispatch => {
    try {
      const { error, data } = await request('/api/attendance/mark', 'POST', {
        id,
        isAttend,
      })

      if (!error) {
        dispatch({
          type: SET_STUDENT_ATTEND,
          id,
          isAttend,
        })
      } else {
        errorToast(data.message)
      }
    } catch (e) {}
  }
}

export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
  }
}

export function resetAttendanceStateAction() {
  return {
    type: RESET_ATTENDANCE_STATE,
  }
}
