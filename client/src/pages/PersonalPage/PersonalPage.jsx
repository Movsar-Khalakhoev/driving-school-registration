import React from 'react'
import s from './PersonalPage.module.sass'
import UserInfo from '../../components/UserInfo/UserInfo'
import PracticeContainer from '../../components/PracticeContainer/PracticeContainer'

const PersonalPage = () => {
  return (
    <div className={s.personal}>
      <UserInfo />
      <div className={s.elems}>
        <button className={`${s.visits} btn_1 mr2`}>Дропдаун</button>
        <button className={`${s.add_student} btn_1`}>Добавить студента</button>
      </div>
      <PracticeContainer />
    </div>
  )
}

export default PersonalPage
