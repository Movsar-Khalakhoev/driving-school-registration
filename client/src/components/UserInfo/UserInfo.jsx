import React from 'react'
import s from './UserInfo.module.sass'
import defaultAvatar from '../../assets/img/default_avatar.jpg'

const UserInfo = () => {
  return (
    <div className={`${s.main} mb2`}>
      <div className={`${s.image} mr2`}>
        <img src={defaultAvatar} alt="Аватарка" />
      </div>
      <div className={s.info}>
        <p className={`${s.name} mb2`}>Иванов Иван Иванович</p>
        <p className={`${s.phone_container} mb1`}>
          Номер телефона:
          <span className={s.phone}>+7 777 777 77 77</span>
        </p>
        <p className={s.date_container}>
          Дата создания:
          <span className={s.date}>12.12.2020</span>
        </p>
      </div>
      <div className={`${s.delete_student} btn_2`}>Удалить студента</div>
    </div>
  )
}

export default UserInfo
