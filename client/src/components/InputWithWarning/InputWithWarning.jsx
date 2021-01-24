import React from 'react'
import s from './InputWithWarning.module.sass'
import InputMask from 'react-input-mask'

const InputWithWarning = ({
  containerClassName,
  label,
  placeholder,
  onChange,
  error,
  isTried,
  mask,
}) => {
  return (
    <div className={containerClassName}>
      <label className={s.label}>{label}</label>
      <div className={s.wrapper}>
        <InputMask
          type='text'
          className={s.input}
          onChange={onChange}
          mask={mask || ''}
          placeholder={placeholder || label || ''}
        />
        {error && isTried ? (
          <i className={`${s.error} icofont-warning-alt`} />
        ) : null}
      </div>
    </div>
  )
}

export default InputWithWarning
