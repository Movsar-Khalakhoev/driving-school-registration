import React, {useRef, useState} from 'react'
import InputMask from 'react-input-mask'
import s from './AuthPage.module.sass'
import useFormValidator from '../../hooks/formValidator.hook'

const loginCondition = value => {
  return value.replace(/\D/g, '').length < 11
}

const passwordCondition = value => {
  const passwordLength = value.length

  return passwordLength < 6 || passwordLength > 12
}

const AuthPage = () => {
  const [
    [loginInputRef, loginValueHandler, loginError],
    [passwordInputRef, passwordValueHandler, passwordError],
    [triedHandler, isTried]
  ] = useFormValidator([
    {
      ref: useRef(),
      errorState: useState(true),
      condition: loginCondition
    },
    {
      ref: useRef(),
      errorState: useState(true),
      condition: passwordCondition
    }
    ])

  console.log('rendered')

  return (
      <div className={s.authorization}>
        <div className={`${s.form} shadow`}>
          <p className={s.title}>Авторизация</p>
          <div>
            <div className={`${s.input_container} mb2`}>
              <InputMask
                className={`${s.input} ${loginError && isTried ? s.input_error : ''}`}
                type="text"
                ref={loginInputRef}
                onChange={loginValueHandler}
                mask='+9 (999) 999 99 99'
                placeholder="Логин"
              />
              { loginError && isTried ? <i className={`${s.error} icofont-warning-alt`} /> : null }
            </div>
            <div className={`${s.input_container} mb3`}>
              <input
                className={`${s.input} ${passwordError && isTried ? s.input_error : ''}`}
                type="password"
                ref={passwordInputRef}
                onChange={passwordValueHandler}
                placeholder="Пароль"
              />
              { passwordError && isTried ? <i className={`${s.error} icofont-warning-alt`} /> : null }
            </div>
          </div>
          <button
            className={`${s.button} btn_1`}
            onClick={triedHandler}
          >Войти</button>
        </div>
      </div>
  )
}

export default AuthPage
