import React from 'react'
import s from './RentedInterval.module.sass'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import Loader from '../../../../components/Loader/Loader'
import { deleteRentRequest } from '../../../../redux/actions/personal.action'

const RentedInterval = ({ interval, mode }) => {
  const [dispatchDeleteRent, isLoadingDeleteRent] = useDispatchWithHttp()
  const { timestamp, isRevocable, isActive } = interval
  const date = new Date(timestamp)

  const deleteRentHandler = () =>
    dispatchDeleteRent(deleteRentRequest, [timestamp])

  return (
    <div className={s.rented}>
      <div className={s.info}>
        <p className={s.type_container}>{mode}</p>
        <p className={s.date_container}>
          Дата: <span className={s.date}>{date.toLocaleDateString()}</span>
        </p>
        <p className={s.time_container}>
          Время:
          <span className={s.date}>
            {' '}
            {date.getHours()}:00 - {date.getHours() + 1}:00
          </span>
        </p>
      </div>
      {isActive ? (
        isRevocable ? (
          <button className={`${s.undo} btn_1`} onClick={deleteRentHandler}>
            {isLoadingDeleteRent ? <Loader width={20} /> : 'Отменить'}
          </button>
        ) : (
          <p className={s.no_revokable}>Нельзя отменить</p>
        )
      ) : null}
    </div>
  )
}

export default RentedInterval
