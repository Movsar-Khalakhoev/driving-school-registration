import React, { useEffect, useState } from 'react'
import s from './AddUserPage.module.sass'
import Select from 'react-select'
import useFormValidator from '../../hooks/formValidator.hook'
import useAuth from '../../hooks/auth.hook'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUser, getRoles } from '../../redux/actions/addUser.action'
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader'
import InputWithWarning from '../../components/InputWithWarning/InputWithWarning'

const nameCondition = value => {
  return !value.match(/[\wa-z0-9]+/gi) && value.trim().length > 6
}

const phoneCondition = value => {
  return value.replace(/\D/g, '').length === 11
}

const roleCondition = value => {
  return !!value.value
}

const AddUserPage = () => {
  const [
    [nameHandler, nameErr],
    [phoneHandler, phoneErr],
    [rolesHandler, rolesErr],
    [isTried, tryHandler],
  ] = useFormValidator([
    {
      errorState: useState(() => !nameCondition('')),
      valueState: useState(''),
      condition: nameCondition,
    },
    {
      errorState: useState(!phoneCondition('')),
      valueState: useState(!phoneCondition('')),
      condition: phoneCondition,
    },
    {
      errorState: useState(!roleCondition('')),
      valueState: useState(''),
      condition: roleCondition,
    },
  ])
  const { token } = useAuth()
  const dispatch = useDispatch()
  const { loading: addUserLoading } = useSelector(
    state => state.addNewUser.addUser
  )
  const { loading: rolesLoading, roles } = useSelector(
    state => state.addNewUser.roles
  )

  const buttonState =
    addUserLoading || (isTried && (nameErr || phoneErr || rolesErr))

  const addUser = () => {
    const func = (...args) => dispatch(addNewUser(...args, token))

    tryHandler(func)
  }

  useEffect(() => dispatch(getRoles(token)), [dispatch, token])

  return (
    <div className={s.add}>
      <InputWithWarning
        containerClassName={s.input_container}
        label='ФИО пользователя:'
        onChange={event => nameHandler(event.target.value)}
        error={nameErr}
        isTried={isTried}
      />
      <InputWithWarning
        containerClassName={s.input_container}
        label='Логин (номер телефона):'
        placeholder='Номер телефона'
        mask='+9 (999) 999 99 99'
        onChange={event => phoneHandler(event.target.value)}
        error={phoneErr}
        isTried={isTried}
      />
      <div className={s.role}>
        <label className={s.label}>Статус пользователя:</label>
        <SkeletonLoader loading={rolesLoading} className={s.select_loader}>
          <div className={s.wrapper}>
            <Select options={roles} onChange={rolesHandler} />
            {rolesErr && isTried ? (
              <i className={`${s.error} icofont-warning-alt`} />
            ) : null}
          </div>
        </SkeletonLoader>
      </div>
      <button
        onClick={addUser}
        className={`${s.button} ${buttonState ? s.button_disabled : ''} btn_1`}
        disabled={buttonState}
      >
        Добавить
      </button>
    </div>
  )
}

export default AddUserPage
