import React, { useEffect } from 'react'
import s from './UsersPage.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { filterUsers, getAllUsers } from '../../redux/actions/users.action'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'
import UserCard from '../../components/UserCard/UserCard'

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
            <UserCard link={`/users/${user.id}`} name={user.name} key={user.id}>
              <p className={s.roles}>{user.roles[0]}</p>
            </UserCard>
          ))
        ) : (
          <p className={s.warning}>Ничего не найдено</p>
        )}
      </div>
    </div>
  )
}

export default UsersPage
