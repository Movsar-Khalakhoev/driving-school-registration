import React from 'react'
import s from './Navbar.module.sass'

const Navbar = () => {
  console.log(s)
  return (
    <div className={s.navbar}>
      <p className={s.logo}>Автошкола</p>
      <div className={s.sections}>
        <div className={s.section}>
          <i className={`${s.ico} icofont-notepad`} />
          Расписание
        </div>
        <div className={`${s.section} mr3`}>
          <i className={`${s.ico} icofont-ui-user`} />
          Кабинет
        </div>
        <span className={s.logout}>
				<i className='icofont-logout' />
			</span>
        <span className={s.hamburger}>
				<span className={s.line_1} />
				<span className={s.line_2} />
				<span className={s.line_3} />
			</span>
      </div>
    </div>
  )
}

export default Navbar
