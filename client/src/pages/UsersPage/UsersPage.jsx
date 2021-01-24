import React, { useEffect, useContext } from 'react'
import s from './UsersPage.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { filterUsers, getAllUsers } from '../../redux/actions/users.action'
import AuthContext from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'

const UsersPage = () => {
  const dispatch = useDispatch()
  const { loading, users, filteredUsers } = useSelector(state => state.users)
  const { token } = useContext(AuthContext)
  let timeout

  useEffect(() => dispatch(getAllUsers(token)), [dispatch, token])

  const searchHandler = event => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(filterUsers(users, { inputValue: event.target.value }))
    }, 500)
  }

  return (
    <div className={s.users}>
      <input
        className={`${s.input} mb2`}
        onChange={searchHandler}
        type="text"
        placeholder="ФИО пользователя"
      />
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : filteredUsers.length ? (
          filteredUsers.map(user => (
            <div className={s.user} key={user.id}>
              <NavLink to={user.id} className={s.name}>
                {user.name}
              </NavLink>
              <p className={s.roles}>{user.roles[0]}</p>
            </div>
          ))
        ) : (
          <p className={s.warning}>Ничего не найдено</p>
        )}
      </div>
    </div>
  )
}

export default UsersPage
