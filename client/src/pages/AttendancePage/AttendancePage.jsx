import { useEffect } from 'react'
import s from './AttendancePage.module.sass'
import UserCard from '../../components/UserCard/UserCard'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeMode,
  fetchStudentsListAction,
  setStudentAttendAction,
} from '../../redux/actions/AttendancePage.actions'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'
import Loader from '../../components/Loader/Loader'

const AttendancePage = () => {
  const dispatch = useDispatch()
  const [fetchStudentsList, isLoadingFetchStudentsList] = useDispatchWithHttp()
  const [setStudentAttend, isLoadingSetStudentAttend] = useDispatchWithHttp()
  const { studentsList, modes, activeMode } = useSelector(
    state => state.attendance
  )

  useEffect(() => {
    fetchStudentsList(fetchStudentsListAction)
  }, [])

  return (
    <div className={s.attendance}>
      <div className={s.header}>
        <Select
          className={s.modes}
          options={modes}
          defaultValue={activeMode}
          onChange={value => dispatch(changeMode(value))}
        />
        <div className={s.today}>
          {new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
          })}
        </div>
      </div>
      <div className={s.students_list}>
        {studentsList
          .filter(student =>
            activeMode.value !== 'all'
              ? activeMode.value === 'marked'
                ? student.isAttend
                : !student.isAttend
              : true
          )
          .map(student => {
            return (
              <UserCard
                link={`/users/${student.id}`}
                name={student.name}
                key={student.id}
              >
                <div className={s.info}>
                  {student.isAttend !== null && (
                    <>
                      <span className={s.is_attend}>
                        {student.isAttend ? 'Присутствует' : 'Отсутствует'}
                      </span>
                      <button
                        className={s.refresh_button}
                        onClick={() =>
                          setStudentAttend(setStudentAttendAction, [
                            student.id,
                            null,
                          ])
                        }
                      >
                        {isLoadingSetStudentAttend ? (
                          <Loader width={14} />
                        ) : (
                          <>
                            Отменить
                            <i
                              className={`${s.refresh_icon} icofont-refresh`}
                            />
                          </>
                        )}
                      </button>
                    </>
                  )}
                  {student.isAttend === null && (
                    <div className={s.student_actions}>
                      <button
                        className={`${s.no_attend_button} btn_2`}
                        onClick={() =>
                          setStudentAttend(setStudentAttendAction, [
                            student.id,
                            false,
                          ])
                        }
                      >
                        {isLoadingSetStudentAttend ? (
                          <Loader width={20} />
                        ) : (
                          'Отсутствует'
                        )}
                      </button>
                      <button
                        className={`${s.attend_button} btn_1`}
                        onClick={() =>
                          setStudentAttend(setStudentAttendAction, [
                            student.id,
                            true,
                          ])
                        }
                      >
                        {isLoadingSetStudentAttend ? (
                          <Loader width={20} />
                        ) : (
                          'Присутствует'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </UserCard>
            )
          })}
      </div>
    </div>
  )
}

export default AttendancePage
