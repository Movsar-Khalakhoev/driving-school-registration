import React, { useEffect, useState } from 'react'
import s from './AddUser.module.sass'
import Select from 'react-select'
import useFormValidator from '../../hooks/formValidator.hook'
import { useSelector } from 'react-redux'
import { addNewUser, getRoles } from '../../redux/actions/AddUserPage.actions'
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader'
import InputWithWarning from '../../components/InputWithWarning/InputWithWarning'
import useDispatchWithHttp from '../../hooks/dispatchWithHttp.hook'

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
  const [dispatchAddUser, isLoadingAddUser] = useDispatchWithHttp()
  const [dispatchRoles, isLoadingRoles] = useDispatchWithHttp()
  const { roles } = useSelector(state => state.addNewUser.roles)

  const buttonState =
    isLoadingAddUser || (isTried && (nameErr || phoneErr || rolesErr))

  const addUser = () => {
    const func = (...args) => dispatchAddUser(addNewUser, [...args])

    tryHandler(func)
  }

  useEffect(() => dispatchRoles(getRoles), [dispatchRoles])

  return (
    <div className={s.add}>
      <InputWithWarning
        containerClassName={s.input_container}
        inputClassName={s.input}
        label='ФИО пользователя:'
        onChange={event => nameHandler(event.target.value)}
        error={nameErr}
        isTried={isTried}
        errorMessage='ФИО не должно содержать латинских букв, цифр; должно быть не короче 6 символов'
      />
      <InputWithWarning
        containerClassName={s.input_container}
        inputClassName={s.input}
        label='Логин (номер телефона):'
        placeholder='Номер телефона'
        mask='+9 (999) 999 99 99'
        onChange={event => phoneHandler(event.target.value)}
        error={phoneErr}
        isTried={isTried}
        errorMessage='Введите корректный номер телефона'
      />
      <div className={s.role}>
        <label className={s.label}>Статус пользователя:</label>
        <SkeletonLoader loading={isLoadingRoles} className={s.select_loader}>
          <div className={s.wrapper}>
            <Select options={roles} onChange={rolesHandler} />
            {rolesErr && isTried ? (
              <>
                <i className={`${s.error} icofont-warning-alt`} />
                <small className={s.error_message}>Выберите роль</small>
              </>
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
