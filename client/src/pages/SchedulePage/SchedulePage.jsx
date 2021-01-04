import React from 'react'
import s from './SchedulePage.module.sass'
import BookedHour from '../../components/BookedHour/BookedHour'

const SchedulePage = () => {
  return (
    <div className={s.schedule}>
      <button className={`${s.select} btn_1 mb1`}>Дропдаун</button>
      <div className={s.container}>
        <BookedHour hour='9:00 - 10:00' />
        <BookedHour
          rented
          name='Иванов Иван Иванович'
          hour='10:00 - 11:00'
        />
        <BookedHour hour='11:00 - 12:00' />
        <BookedHour hour='12:00 - 13:00' />
        <BookedHour hour='13:00 - 14:00' />
        <BookedHour
          rented
          name='Иванов Иван Иванович'
          hour='14:00 - 15:00'
        />
        <BookedHour hour='15:00 - 16:00' />
        <BookedHour hour='16:00 - 17:00' />
        <BookedHour hour='17:00 - 18:00' />
      </div>
    </div>
  )
}

export default SchedulePage
