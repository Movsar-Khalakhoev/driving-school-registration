import React from 'react'
import s from './UserAdded.module.sass'

const UserAdded = ({login, password}) => {
  return (
    <div className={s.data}>
      <p className={s.login}>Логин: <span>{login}</span></p>
      <p className={s.password}>Пароль: <span>{password}</span></p>
    </div>
  )
}

export default UserAdded
