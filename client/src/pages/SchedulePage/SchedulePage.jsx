import React, { useEffect } from 'react'
import s from './SchedulePage.module.sass'
import BookedHour from './subcomponents/BookedHour/BookedHour'
import Loader from '../../components/Loader/Loader'
import { useSelector } from 'react-redux'
import { getSchedule, rentInterval } from '../../redux/actions/schedule.action'
import Parameters from './subcomponents/Parameters'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'

const SchedulePage = () => {
  const { schedule } = useSelector(state => state.schedule.schedule)
  const { activeInstructor } = useSelector(state => state.schedule)
  const { activePracticeMode } = useSelector(state => state.schedule)
  const { activeDate } = useSelector(state => state.schedule)
  const { components } = useSelector(state => state.variables)
  const [dispatchSchedule, isLoadingSchedule] = useDispatchWithHttp()
  const [dispatchRentInterval, isLoadingRentInterval] = useDispatchWithHttp()

  const rentIntervalHandler = timestamp =>
    dispatchRentInterval(rentInterval, [
      activeInstructor.value,
      activePracticeMode.value,
      timestamp,
    ])

  useEffect(() => {
    if (activePracticeMode.value && activeInstructor.value) {
      dispatchSchedule(getSchedule, [
        activeDate,
        activePracticeMode.value,
        activeInstructor.value,
      ])
    }
  }, [activePracticeMode, activeInstructor, dispatchSchedule, activeDate])

  return (
    <div className={s.schedule}>
      <Parameters />
      <div className={s.container}>
        {!activePracticeMode.value ? (
          <div className={s.warning}>Выберите режим</div>
        ) : null}
        {!activeInstructor.value ? (
          <div className={s.warning}>Выберите инструктора</div>
        ) : null}
        {isLoadingSchedule || isLoadingRentInterval ? (
          <Loader />
        ) : (
          schedule.map(item => (
            <BookedHour
              key={item.id}
              rented={!!item.name || !item.isRentable}
              isDisabledForThisRole={components.rentIntervalButton}
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
