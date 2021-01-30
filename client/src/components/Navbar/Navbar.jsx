import React, { useContext, useState } from 'react'
import s from './Navbar.module.sass'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { userId, logout } = useContext(AuthContext)
  const { components } = useSelector(state => state.variables)
  const [menuIsActive, setMenuIsActive] = useState(false)

  return (
    <div className={s.navbar}>
      <p className={s.logo}>Автошкола</p>
      <div className={`${s.sections} ${menuIsActive ? s.active : ''}`}>
        {components.usersPage && (
          <NavLink
            exact
            to='/users/'
            activeClassName={s.active}
            className={s.section}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-users-alt-3`} />
            Пользователи
          </NavLink>
        )}
        {components.attendancePage && (
          <NavLink
            to='/attendance'
            activeClassName={s.active}
            className={s.section}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-notepad`} />
            Посещаемость
          </NavLink>
        )}
        {components.addUserPage && (
          <NavLink
            to='/add-user'
            activeClassName={s.active}
            className={s.section}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-ui-add`} />
            Добавить пользователя
          </NavLink>
        )}
        {components.schedulePage && (
          <NavLink
            exact
            to='/'
            activeClassName={s.active}
            className={s.section}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-contact-add`} />
            Расписание
          </NavLink>
        )}
        {components.userPage && (
          <NavLink
            to={`/users/${userId}`}
            activeClassName={s.active}
            className={s.section}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-ui-user`} />
            Кабинет
          </NavLink>
        )}
        {components.settingsPage && (
          <NavLink
            to='/settings'
            activeClassName={s.active}
            className={`${s.section} mr3`}
            onClick={() => setMenuIsActive(false)}
          >
            <i className={`${s.ico} icofont-settings-alt`} />
            Настройки
          </NavLink>
        )}
        <span className={s.logout} onClick={logout}>
          <i className='icofont-logout' />
        </span>
        <span
          className={`${s.hamburger} ${menuIsActive ? s.active : ''}`}
          onClick={() => setMenuIsActive(prev => !prev)}
        >
          <span className={s.line_1} />
          <span className={s.line_2} />
          <span className={s.line_3} />
        </span>
      </div>
    </div>
  )
}

export default Navbar
