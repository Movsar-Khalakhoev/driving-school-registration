import React, { useContext, useEffect, useState } from 'react'
import s from './SchedulePage.module.sass'
import BookedHour from './subcomponents/BookedHour/BookedHour'
import Loader from '../../components/Loader/Loader'
import AuthContext from '../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInstructors,
  getPracticeModes,
  getSchedule,
  rentInterval,
} from '../../redux/actions/schedule.action'
import Parameters from './subcomponents/Parameters'
import { dateWithoutTime } from '../../utils/date'

const SchedulePage = () => {
  const { loading: scheduleLoading, schedule } = useSelector(
    state => state.schedule.schedule
  )
  const { active: instructor } = useSelector(
    state => state.schedule.instructors
  )
  const { active: practiceMode } = useSelector(
    state => state.schedule.practiceModes
  )
  const dispatch = useDispatch()
  const [scheduleDate, setScheduleDate] = useState(dateWithoutTime())
  const { token } = useContext(AuthContext)

  const rentIntervalHandler = timestamp =>
    dispatch(
      rentInterval(instructor.value, practiceMode.value, timestamp, token)
    )

  useEffect(() => dispatch(getInstructors(token)), [dispatch, token])

  useEffect(() => dispatch(getPracticeModes(token)), [dispatch, token])

  useEffect(() => {
    if (practiceMode.value && instructor.value) {
      dispatch(
        getSchedule(scheduleDate, practiceMode.value, instructor.value, token)
      )
    }
  }, [practiceMode, instructor, dispatch, scheduleDate, token])

  return (
    <div className={s.schedule}>
      <Parameters
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
      />
      <div className={s.container}>
        {!practiceMode.value ? (
          <h2 className={s.warning}>Выберите режим</h2>
        ) : null}
        {!instructor.value ? (
          <h2 className={s.warning}>Выберите инструктора</h2>
        ) : null}
        {scheduleLoading ? (
          <Loader />
        ) : (
          schedule.map(item => (
            <BookedHour
              key={item.id}
              rented={!!item.name || !item.isRentable}
              name={item.name || ''}
              interval={item.interval}
              onClick={() => rentIntervalHandler(item.timestamp)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SchedulePage
