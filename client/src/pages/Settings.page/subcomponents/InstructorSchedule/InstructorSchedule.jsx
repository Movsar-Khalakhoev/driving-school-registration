import React, { useState, useEffect } from 'react'
import s from './InstructorSchedule.module.sass'
import Parameters from './Parameters'
import Loader from '../../../../components/Loader/Loader'
import TableHead from './TableHead'
import TableRow from './TableRow'
import {
  getSettingsCurrentSchedule,
  getSettingsPeriodicSchedule,
  setSettingsCurrentSchedule,
  setSettingsPeriodicSchedule,
} from '../../../../redux/actions/SettingsPage.actions'
import { useSelector } from 'react-redux'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import { getWeekInterval } from '../../../../utils/date'

const InstructorSchedule = ({ isEditableView = true }) => {
  const { changedCells, activeMode, activeInstructor } = useSelector(
    state => state.settings.schedule
  )
  const { forRentHoursInterval } = useSelector(
    state => state.variables.variables
  )
  const [dispatchSchedule, isLoadingSchedule] = useDispatchWithHttp()
  const [activeWeek, setActiveWeek] = useState(() => getWeekInterval())

  const fetchChangesHandler = () => {
    if (changedCells.length) {
      activeMode.value === 'periodic'
        ? dispatchSchedule(setSettingsPeriodicSchedule, [changedCells])
        : dispatchSchedule(setSettingsCurrentSchedule, [
            changedCells,
            activeWeek[0],
          ])
    }
  }

  useEffect(() => {
    if (!isEditableView && !activeInstructor.value) {
      return
    }
    activeMode.value === 'periodic'
      ? dispatchSchedule(getSettingsPeriodicSchedule, [
          activeInstructor,
          isEditableView,
        ])
      : dispatchSchedule(getSettingsCurrentSchedule, [
          activeWeek,
          activeInstructor,
          isEditableView,
        ])
  }, [activeMode, activeWeek, activeInstructor])
  return (
    <div className={s.instructor_schedule}>
      <Parameters
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        activeMode={activeMode}
        isEditableView={isEditableView}
      />
      {isEditableView || (!isEditableView && activeInstructor.value) ? (
        <div
          className={`${s.table_wrapper} ${
            isLoadingSchedule ? s.table_wrapper_loading : ''
          }`}
        >
          {isLoadingSchedule && (
            <div className={s.loading}>
              <Loader />
            </div>
          )}
          <table className={s.table}>
            <TableHead activeWeek={activeWeek} activeMode={activeMode} />
            <tbody>
              {[
                ...Array(
                  forRentHoursInterval[1] - forRentHoursInterval[0]
                ).keys(),
              ].map((cell, hourIdx) => (
                <TableRow
                  key={cell}
                  hour={hourIdx + forRentHoursInterval[0]}
                  activeMode={activeMode}
                  activeWeek={activeWeek}
                  isEditableView={isEditableView}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={s.warning}>Выберите инструктора</p>
      )}
      {isEditableView && (
        <button
          className={`${s.save} btn_1`}
          onClick={fetchChangesHandler}
          disabled={isLoadingSchedule}
        >
          Сохранить
        </button>
      )}
    </div>
  )
}

export default InstructorSchedule
