import React from 'react'
import s from './InputWithWarning.module.sass'
import InputMask from 'react-input-mask'

const InputWithWarning = ({
  containerClassName = '',
  inputClassName = '',
  label,
  placeholder,
  onChange,
  error,
  isTried,
  mask,
  errorMessage,
}) => {
  return (
    <div className={containerClassName}>
      <label className={s.label}>{label}</label>
      <div className={s.wrapper}>
        <InputMask
          type='text'
          className={`${s.input} ${inputClassName}`}
          onChange={onChange}
          mask={mask || ''}
          placeholder={placeholder || label || ''}
        />
        {error && isTried ? (
          <>
            <i className={`${s.error} icofont-warning-alt`} />
            <small className={s.error_message}>{errorMessage}</small>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default InputWithWarning
