import React from 'react'
import s from './BookedHour.module.sass'

const BookedHour = ({rented = false, interval = '', name = '', onClick}) => {
  return (
    <div className={`${s.interval} ${rented ? s.disabled : ''}`}>
      <span className={s.hours}>{interval}</span>
      {
        rented
          ? <span className={s.rented}>{name}</span>
          : <button
              className={`${s.button} btn_1`}
              onClick={onClick}
            >Забронировать</button>
      }
    </div>
  )
}

export default BookedHour
