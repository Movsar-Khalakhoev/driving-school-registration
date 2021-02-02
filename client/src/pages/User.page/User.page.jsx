import React from 'react'
import s from './User.module.sass'
import UserInfo from './subcomponents/UserInfo/UserInfo'
import PracticeContainer from './subcomponents/PracticeContainer/PracticeContainer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserPage = () => {
  const { isVisitsVisible } = useSelector(state => state.user.schedule)
  const { userId } = useParams()

  return (
    <div className={s.personal}>
      <UserInfo userId={userId} />
      {isVisitsVisible && <PracticeContainer userId={userId} />}
    </div>
  )
}

export default UserPage
