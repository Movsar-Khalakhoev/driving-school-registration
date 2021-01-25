import React from 'react'
import s from './Loader.module.sass'

const Loader = ({ width = 200 }) => {
  return (
    <div
      className={s.loader_wrapper}
      style={{ width: width, height: `${width}px` }}
    >
      <div className={s.loader}>
        <div
          style={{ borderWidth: width / 6, top: width / 2, left: width / 2 }}
        />
      </div>
    </div>
  )
}

export default Loader
