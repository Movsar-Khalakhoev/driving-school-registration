import React, { useEffect } from 'react'
import s from './UserInfo.module.sass'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  deleteUser,
  getPersonal,
} from '../../../../redux/actions/personal.action'
import SkeletonLoader from '../../../../components/SkeletonLoader/SkeletonLoader'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import Loader from '../../../../components/Loader/Loader'

const UserInfo = ({ userId }) => {
  const [dispatchUser, isLoadingUser] = useDispatchWithHttp()
  const [dispatchDeleteUser, isLoadingDeleteUser] = useDispatchWithHttp()
  const { user } = useSelector(state => state.personal.info)
  const history = useHistory()

  const deleteUserHandler = () => {
    dispatchDeleteUser(deleteUser, [userId], () => history.push('/users'))
  }

  useEffect(() => {
    if (user._id === userId) return
    dispatchUser(getPersonal, [userId])
  }, [dispatchUser, userId])

  return (
    <div className={`${s.main} mb2`}>
      <SkeletonLoader
        className={`${s.image_loader} mr2`}
        loading={isLoadingUser}
      >
        <div className={s.image}>
          <img src={user.image} alt='Аватарка' />
        </div>
      </SkeletonLoader>
      <div className={s.info}>
        <SkeletonLoader
          className={`${s.name_loader} mb2`}
          loading={isLoadingUser}
        >
          <p className={s.name}>{user.name}</p>
        </SkeletonLoader>
        <SkeletonLoader
          className={`${s.phone_loader} mb1`}
          loading={isLoadingUser}
        >
          <p className={s.phone_container}>
            Номер телефона:
            <span className={s.phone}> {user.login}</span>
          </p>
        </SkeletonLoader>
        <SkeletonLoader
          className={`${s.phone_loader} mb1`}
          loading={isLoadingUser}
        >
          <p className={s.date_container}>
            Дата создания:
            <span className={s.date}>
              {' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </p>
        </SkeletonLoader>
      </div>
      <div className={`${s.delete_student} btn_2`} onClick={deleteUserHandler}>
        {isLoadingDeleteUser ? <Loader width={20} /> : 'Удалить пользователя'}
      </div>
    </div>
  )
}

export default UserInfo
