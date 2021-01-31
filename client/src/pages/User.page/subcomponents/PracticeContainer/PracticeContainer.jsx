import React, { useEffect } from 'react'
import s from './PracticeContainer.module.sass'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  changePersonalMode,
  getPersonalModes,
  getPersonSchedule,
} from '../../../../redux/actions/UserPage.actions'
import Loader from '../../../../components/Loader/Loader'
import RentedInterval from '../RentedInterval/RentedInterval.jsx'
import SkeletonLoader from '../../../../components/SkeletonLoader/SkeletonLoader'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'

const PracticeContainer = ({ userId }) => {
  const dispatch = useDispatch()
  const [dispatchIntervals, isLoadingIntervals] = useDispatchWithHttp()
  const [dispatchModes, isLoadingModes] = useDispatchWithHttp()
  const { intervals } = useSelector(state => state.personal.schedule)
  const { modes, active: mode } = useSelector(state => state.personal.modes)

  const changeModeHandler = mode => dispatch(changePersonalMode(mode))

  useEffect(() => {
    if (modes.length) return
    dispatchModes(getPersonalModes)
  }, [dispatchModes])

  useEffect(() => {
    if (!mode.value) return
    dispatchIntervals(getPersonSchedule, [mode.value, userId])
  }, [dispatchIntervals, mode, userId])

  return (
    <div className={s.schedule}>
      <SkeletonLoader loading={isLoadingModes} className={s.visits_loader}>
        <Select
          className={s.visits}
          defaultValue={mode.value ? mode : null}
          options={modes}
          onChange={changeModeHandler}
          placeholder='Выберите категорию'
        />
      </SkeletonLoader>
      <div className={`${s.container} mt1`}>
        {isLoadingIntervals ? (
          <Loader />
        ) : intervals.length ? (
          intervals.map(interval => (
            <RentedInterval
              key={interval.id}
              interval={interval}
              mode={mode.label}
            />
          ))
        ) : mode.value ? (
          <h2 className={s.warning}>Ничего не найдено</h2>
        ) : (
          <h2 className={s.warning}>Выберите категорию</h2>
        )}
      </div>
    </div>
  )
}

export default PracticeContainer
