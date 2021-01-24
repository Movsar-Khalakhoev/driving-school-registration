import React, { useState, useEffect, useContext } from 'react'
import s from './SettingsPage.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSettingsCurrentSchedule,
  getSettingsPeriodicSchedule,
  setSettingsCurrentSchedule,
  setSettingsPeriodicSchedule,
} from '../../redux/actions/settings.action'
import AuthContext from '../../context/AuthContext'
import Loader from '../../components/Loader/Loader'
import { getWeekInterval } from '../../utils/date'
import Parameters from './subcomponents/Parameters.jsx'
import TableHead from './subcomponents/TableHead.jsx'
import TableRow from './subcomponents/TableRow'

const SettingsPage = () => {
  const dispatch = useDispatch()
  const { changedCells, activeMode, loading } = useSelector(
    state => state.settings.schedule
  )

  const { forRentHoursInterval } = useSelector(
    state => state.variables.variables
  )

  const { token } = useContext(AuthContext)
  const [activeWeek, setActiveWeek] = useState(() => getWeekInterval())

  useEffect(() => {
    activeMode.value === 'periodic'
      ? dispatch(getSettingsPeriodicSchedule(token))
      : dispatch(getSettingsCurrentSchedule(token, activeWeek))
  }, [activeMode, activeWeek])

  const fetchChangesHandler = () => {
    if (changedCells.length) {
      activeMode.value === 'periodic'
        ? dispatch(setSettingsPeriodicSchedule(changedCells, token))
        : dispatch(
            setSettingsCurrentSchedule(changedCells, activeWeek[0], token)
          )
    }
  }

  console.log(forRentHoursInterval)

  return (
    <div className={s.settings}>
      <Parameters
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        activeMode={activeMode}
      />
      <div className={s.table_wrapper}>
        {loading && (
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
        disabled={loading}
      >
        Сохранить
      </button>
    </div>
  )
}

export default SettingsPage
