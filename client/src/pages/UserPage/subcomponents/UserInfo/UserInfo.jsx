import React, { useContext, useEffect } from 'react'
import s from './UserInfo.module.sass'
import AuthContext from '../../../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { getPersonal } from '../../../../redux/actions/personal.action'
import SkeletonLoader from '../../../../components/SkeletonLoader/SkeletonLoader'

const UserInfo = ({ userId }) => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.personal.info)
  const { token } = useContext(AuthContext)

  useEffect(() => {
    if (user._id === userId) return
    dispatch(getPersonal(token, userId))
  }, [dispatch, token, userId])

  return (
    <div className={`${s.main} mb2`}>
      <SkeletonLoader className={`${s.image_loader} mr2`} loading={loading}>
        <div className={s.image}>
          <img src={user.image} alt='Аватарка' />
        </div>
      </SkeletonLoader>
      <div className={s.info}>
        <SkeletonLoader className={`${s.name_loader} mb2`} loading={loading}>
          <p className={s.name}>{user.name}</p>
        </SkeletonLoader>
        <SkeletonLoader className={`${s.phone_loader} mb1`} loading={loading}>
          <p className={s.phone_container}>
            Номер телефона:
            <span className={s.phone}> {user.login}</span>
          </p>
        </SkeletonLoader>
        <SkeletonLoader className={`${s.phone_loader} mb1`} loading={loading}>
          <p className={s.date_container}>
            Дата создания:
            <span className={s.date}>
              {' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </p>
        </SkeletonLoader>
      </div>
      <div className={`${s.delete_student} btn_2`}>Удалить студента</div>
    </div>
  )
}

export default UserInfo
