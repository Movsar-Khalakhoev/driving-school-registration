import React from 'react'
import s from './BookedHour.module.sass'

const BookedHour = ({rented = false, hour = '', name = ''}) => {
  return (
    <div className={`${s.interval} ${rented ? s.disabled : ''}`}>
      <span className={s.hours}>{hour}</span>
      {
        rented
          ? <span className={s.rented}>{name}</span>
          : <button className={`${s.button} btn_1`}>Забронировать</button>
      }
    </div>
  )
}

export default BookedHour
