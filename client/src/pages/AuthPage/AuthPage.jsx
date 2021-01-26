import React, { useState, useContext } from 'react'
import InputMask from 'react-input-mask'
import s from './AuthPage.module.sass'
import useFormValidator from '../../hooks/formValidator.hook'
import useHttp from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'

const loginCondition = value => {
  return value.replace(/\D/g, '').length >= 11
}

const passCondition = value => {
  const passwordLength = value.length

  return passwordLength >= 6 && passwordLength <= 12
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
      const { data } = await request('/api/auth', 'POST', { login, password })

      if (data.token && data.userId) {
        loginFunc(data.token, data.userId)
      }
    }

    tryHandler(func)
  }

  const register = () => {
    const func = async (login, password) => {
      try {
        await request('/api/auth/register', 'POST', { login, password })
      } catch (e) {}
    }

    tryHandler(func)
  }

  return (
    <div className={s.authorization}>
      <div className={`${s.form} shadow`}>
        <p className={s.title}>Авторизация</p>
        <div>
          <div className={`${s.input_container} mb2`}>
            <InputMask
              className={`${s.input} ${
                loginErr && isTried ? s.input_error : ''
              }`}
              type='text'
              onChange={event => loginHandler(event.target.value)}
              mask='+9 (999) 999 99 99'
              placeholder='Логин'
            />
            {loginErr && isTried ? (
              <i className={`${s.error} icofont-warning-alt`} />
            ) : null}
          </div>
          <div className={`${s.input_container} mb3`}>
            <input
              className={`${s.input} ${
                passErr && isTried ? s.input_error : ''
              }`}
              type='password'
              onChange={event => passHandler(event.target.value)}
              placeholder='Пароль'
            />
            {passErr && isTried ? (
              <i className={`${s.error} icofont-warning-alt`} />
            ) : null}
          </div>
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
          <button
            className={`${s.button} ${
              buttonState ? s.button_disabled : ''
            } btn_1`}
            onClick={register}
            disabled={buttonState}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
