import React from 'react'
import s from './RentedInterval.module.sass'

const RentedInterval = ({ interval, mode }) => {
  const { timestamp, isRevocable, isActive } = interval
  const date = new Date(timestamp)

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
          <div className={`${s.undo} btn_1`}>Отменить</div>
        ) : (
          <p className={s.no_revokable}>Нельзя отменить</p>
        )
      ) : null}
    </div>
  )
}

export default RentedInterval
