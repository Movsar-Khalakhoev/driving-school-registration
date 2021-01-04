import React from 'react'
import s from './PracticeContainer.module.sass'

const PracticeContainer = () => {
  return (
    <div className={`${s.container} mt1`}>
      <div className={s.rented}>
        <div className={s.info}>
          <p className={s.type_container}>
            Практика на площадке
          </p>
          <p className={s.date_container}>
            Дата: <span className={s.date}>12.12.2020</span>
          </p>
          <p className={s.time_container}>
            Время: <span className={s.date}>10:00 - 11:00</span>
          </p>
        </div>
      </div>
      <div className={s.rented}>
        <div className={s.info}>
          <p className={s.type_container}>
            Практика на площадке
          </p>
          <p className={s.date_container}>
            Дата: <span className={s.date}>12.12.2020</span>
          </p>
          <p className={s.time_container}>
            Время: <span className={s.date}>10:00 - 11:00</span>
          </p>
        </div>
        <div className={`${s.undo} btn_1`}>Отменить</div>
      </div>
    </div>
  )
}

export default PracticeContainer
