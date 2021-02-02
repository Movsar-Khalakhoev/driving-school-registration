import React, { useState, useContext } from 'react'
import InputMask from 'react-input-mask'
import s from './Auth.module.sass'
import useFormValidator from '../../hooks/formValidator.hook'
import useHttp from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'
import { errorToast } from '../../utils/toastNotifications'
import InputWithWarning from '../../components/InputWithWarning/InputWithWarning'

const loginCondition = value => {
  return value.replace(/\D/g, '').length >= 11
}

const passCondition = value => {
  const passwordLength = value.length

  return passwordLength >= 6 && passwordLength <= 22
}

const AuthPage = () => {
  const [
    [loginHandler, loginErr],
    [passHandler, passErr],
    [isTried, tryHandler],
  ] = useFormValidator([
    {
      errorState: useState(!loginCondition('')),
      valueState: useState(''),
      condition: loginCondition,
    },
    {
      errorState: useState(!loginCondition('')),
      valueState: useState(''),
      condition: passCondition,
    },
  ])
  const { loading, request } = useHttp()
  const { login: loginFunc } = useContext(AuthContext)

  const buttonState = loading || (isTried && (loginErr || passErr))

  const login = () => {
    const func = async (login, password) => {
      const { error, data } = await request('/api/auth', 'POST', {
        login,
        password,
      })

      if (error) {
        return errorToast(error)
      }

      if (data.token && data.userId) {
        loginFunc(data.token, data.userId)
      }
    }

    tryHandler(func)
  }

  return (
    <div className={s.authorization}>
      <div className={`${s.form} shadow`}>
        <p className={s.title}>Авторизация</p>
        <div>
          <InputWithWarning
            containerClassName={s.input_container}
            placeholder='Логин'
            onChange={event => loginHandler(event.target.value)}
            error={loginErr}
            isTried={isTried}
            mask='+9 (999) 999 99 99'
            errorMessage='Введите корректный номер телефона'
          />
          <InputWithWarning
            containerClassName={s.input_container}
            placeholder='Пароль'
            inputType='password'
            onChange={event => passHandler(event.target.value)}
            error={passErr}
            isTried={isTried}
            errorMessage='Длина пароля от 6 до 22 символов'
          />
        </div>
        <div className={s.card_action}>
          <button
            className={`${s.button} ${
              buttonState ? s.button_disabled : ''
            } btn_1`}
            onClick={login}
            disabled={buttonState}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
