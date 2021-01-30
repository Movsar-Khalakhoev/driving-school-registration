import React from 'react'
import s from './UserCard.module.sass'
import { NavLink } from 'react-router-dom'

const UserCard = ({ link, name, children }) => {
  return (
    <div className={s.user}>
      <NavLink to={link} className={s.name}>
        {name}
      </NavLink>
      {children}
    </div>
  )
}

export default UserCard
