import React from 'react'
import s from './StudentsPage.module.sass'

const StudentsPage = () => {
  return (
    <div className={s.students}>
      <input className={`${s.input} mb2`} type="text" placeholder="ФИО студента" />
        <div className={s.container}>
          <div className={s.student}>
            <p className={s.name}>Иванов Иван Иванович</p>
          </div>
        </div>
    </div>
  )
}

export default StudentsPage
