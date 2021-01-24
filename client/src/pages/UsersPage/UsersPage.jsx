import React, { useEffect } from 'react'
import s from './UsersPage.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { filterUsers, getAllUsers } from '../../redux/actions/users.action'
import { NavLink } from 'react-router-dom'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'

const UsersPage = () => {
  const dispatch = useDispatch()
  const [dispatchUsers, isLoadingUsers] = useDispatchWithHttp()
  const { users, filteredUsers } = useSelector(state => state.users)
  let timeout

  useEffect(() => dispatchUsers(getAllUsers), [dispatch])

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
        type='text'
        placeholder='ФИО пользователя'
      />
      <div className={s.container}>
        {isLoadingUsers ? (
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
