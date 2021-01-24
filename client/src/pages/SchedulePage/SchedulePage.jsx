import React, { useEffect, useState } from 'react'
import s from './SchedulePage.module.sass'
import BookedHour from './subcomponents/BookedHour/BookedHour'
import Loader from '../../components/Loader/Loader'
import { useSelector } from 'react-redux'
import { getSchedule, rentInterval } from '../../redux/actions/schedule.action'
import Parameters from './subcomponents/Parameters'
import { dateWithoutTime } from '../../utils/date'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'

const SchedulePage = () => {
  const { schedule } = useSelector(state => state.schedule.schedule)
  const { active: instructor } = useSelector(
    state => state.schedule.instructors
  )
  const { active: practiceMode } = useSelector(
    state => state.schedule.practiceModes
  )
  const [dispatchSchedule, isLoadingSchedule] = useDispatchWithHttp()
  const [dispatchRentInterval, isLoadingRentInterval] = useDispatchWithHttp()
  const [scheduleDate, setScheduleDate] = useState(() => dateWithoutTime())

  const rentIntervalHandler = timestamp =>
    dispatchRentInterval(rentInterval, [
      instructor.value,
      practiceMode.value,
      timestamp,
    ])

  useEffect(() => {
    if (practiceMode.value && instructor.value) {
      dispatchSchedule(getSchedule, [
        scheduleDate,
        practiceMode.value,
        instructor.value,
      ])
    }
  }, [practiceMode, instructor, dispatchSchedule, scheduleDate])

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
        {isLoadingSchedule || isLoadingRentInterval ? (
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
