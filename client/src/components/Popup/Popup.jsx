import React from 'react'
import s from './Popup.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { deactivatePopup } from '../../redux/actions/Popup.actions'

const Popup = () => {
  const { isActive, content, options } = useSelector(state => state.popup)
  const dispatch = useDispatch()
  const okHandler = () => {
    dispatch(deactivatePopup())
  }

  const cancelHandler = () => {
    dispatch(deactivatePopup())
  }

  return (
    <div className={`${s.popup} ${isActive ? s.active : ''}`}>
      <div className={s.modal}>
        <div className={s.content}>{content}</div>
        <div className={s.action}>
          {!options.disableOk && (
            <button className={`${s.ok} btn_1`} onClick={okHandler}>
              {options.okText || 'Окей'}
            </button>
          )}
          {!options.disableCancel && (
            <button className={`${s.cancel} btn_2`} onClick={cancelHandler}>
              {options.cancelText || 'Отмена'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Popup
