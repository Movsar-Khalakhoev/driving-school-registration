import React, { useContext } from 'react'
import s from './Navbar.module.sass'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { resetAddUserState } from '../../redux/actions/addUser.action'
import { resetScheduleState } from '../../redux/actions/schedule.action'
import { resetSettingsState } from '../../redux/actions/settings.action'
import { resetPersonalState } from '../../redux/actions/personal.action'
import { resetAllUsersState } from '../../redux/actions/users.action'
import { resetVariablesState } from '../../redux/actions/variables.actions'

const Navbar = () => {
  const { userId, logout } = useContext(AuthContext)
  const dispatch = useDispatch()
  const { components } = useSelector(state => state.variables)

  const logoutHandler = () => {
    dispatch(resetAddUserState())
    dispatch(resetScheduleState())
    dispatch(resetSettingsState())
    dispatch(resetPersonalState())
    dispatch(resetAllUsersState())
    dispatch(resetVariablesState())
    logout()
  }

  return (
    <div className={s.navbar}>
      <p className={s.logo}>Автошкола</p>
      <div className={s.sections}>
        {components.usersPage && (
          <NavLink
            exact
            to='/users/'
            activeClassName={s.active}
            className={s.section}
          >
            <i className={`${s.ico} icofont-users-alt-3`} />
            Пользователи
          </NavLink>
        )}
        {components.addUserPage && (
          <NavLink
            to='/add-user'
            activeClassName={s.active}
            className={s.section}
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
          >
            <i className={`${s.ico} icofont-notepad`} />
            Расписание
          </NavLink>
        )}
        {components.userPage && (
          <NavLink
            to={`/users/${userId}`}
            activeClassName={s.active}
            className={s.section}
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
          >
            <i className={`${s.ico} icofont-settings-alt`} />
            Настройки
          </NavLink>
        )}
        <span className={s.logout} onClick={logoutHandler}>
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
