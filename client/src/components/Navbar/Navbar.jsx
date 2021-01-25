import React, { useContext } from 'react'
import s from './Navbar.module.sass'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import useAuth from '../../hooks/auth.hook'

const Navbar = () => {
  const { logout } = useAuth()
  const { userId } = useContext(AuthContext)

  return (
    <div className={s.navbar}>
      <p className={s.logo}>Автошкола</p>
      <div className={s.sections}>
        <NavLink
          exact
          to='/users/'
          activeClassName={s.active}
          className={s.section}
        >
          <i className={`${s.ico} icofont-users-alt-3`} />
          Пользователи
        </NavLink>
        <NavLink
          to='/add-user'
          activeClassName={s.active}
          className={s.section}
        >
          <i className={`${s.ico} icofont-ui-add`} />
          Добавить пользователя
        </NavLink>
        <NavLink exact to='/' activeClassName={s.active} className={s.section}>
          <i className={`${s.ico} icofont-notepad`} />
          Расписание
        </NavLink>
        <NavLink
          to={`/users/${userId}`}
          activeClassName={s.active}
          className={s.section}
        >
          <i className={`${s.ico} icofont-ui-user`} />
          Кабинет
        </NavLink>
        <NavLink
          to='/settings'
          activeClassName={s.active}
          className={`${s.section} mr3`}
        >
          <i className={`${s.ico} icofont-settings-alt`} />
          Настройки
        </NavLink>
        <span className={s.logout} onClick={logout}>
          <i className='icofont-logout' />
        </span>
        <span className={s.hamburger}>
          <span className={s.line_1} />
          <span className={s.line_2} />
          <span className={s.line_3} />
        </span>
      </div>
    </div>
  )
}

export default Navbar
