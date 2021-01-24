import React, { useContext, useEffect } from 'react'
import s from './PracticeContainer.module.sass'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import AuthContext from '../../../../context/AuthContext'
import {
  changePersonalMode,
  getPersonalModes,
  getPersonSchedule,
} from '../../../../redux/actions/personal.action'
import Loader from '../../../../components/Loader/Loader'
import RentedInterval from '../RentedInterval/RentedInterval'
import SkeletonLoader from '../../../../components/SkeletonLoader/SkeletonLoader'

const PracticeContainer = ({ userId }) => {
  const dispatch = useDispatch()
  const { intervals, loading: intervalsLoading } = useSelector(
    state => state.personal.schedule
  )

  const { modes, active: mode, loading: modesLoading } = useSelector(
    state => state.personal.modes
  )
  const { token } = useContext(AuthContext)

  const changeModeHandler = mode => dispatch(changePersonalMode(mode))

  useEffect(() => {
    if (modes.length) return
    dispatch(getPersonalModes(token))
  }, [dispatch, token])

  useEffect(() => {
    if (!mode.value) return
    dispatch(getPersonSchedule(mode.value, token, userId))
  }, [dispatch, token, mode, userId])

  return (
    <div className={s.schedule}>
      <SkeletonLoader loading={modesLoading} className={s.visits_loader}>
        <Select
          className={s.visits}
          defaultValue={mode.value ? mode : null}
          options={modes}
          onChange={changeModeHandler}
          placeholder="Выберите категорию"
        />
      </SkeletonLoader>
      <div className={`${s.container} mt1`}>
        {intervalsLoading ? (
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
