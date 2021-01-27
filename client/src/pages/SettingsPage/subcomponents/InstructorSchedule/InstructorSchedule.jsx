import React, { useState, useEffect } from 'react'
import s from './InstrucrorSchedule.module.sass'
import Parameters from './Parameters'
import Loader from '../../../../components/Loader/Loader'
import TableHead from './TableHead'
import TableRow from './TableRow'
import {
  getSettingsCurrentSchedule,
  getSettingsPeriodicSchedule,
  setSettingsCurrentSchedule,
  setSettingsPeriodicSchedule,
} from '../../../../redux/actions/settings.action'
import { useSelector } from 'react-redux'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import { getWeekInterval } from '../../../../utils/date'

const InstructorSchedule = () => {
  const { changedCells, activeMode } = useSelector(
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
    activeMode.value === 'periodic'
      ? dispatchSchedule(getSettingsPeriodicSchedule)
      : dispatchSchedule(getSettingsCurrentSchedule, [activeWeek])
  }, [activeMode, activeWeek])
  return (
    <div>
      <Parameters
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        activeMode={activeMode}
      />
      <div className={s.table_wrapper}>
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
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        className={`${s.save} btn_1`}
        onClick={fetchChangesHandler}
        disabled={isLoadingSchedule}
      >
        Сохранить
      </button>
    </div>
  )
}

export default InstructorSchedule
