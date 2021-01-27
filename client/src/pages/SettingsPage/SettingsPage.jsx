import React from 'react'
import s from './SettingsPage.module.sass'
import InstructorSchedule from './subcomponents/InstructorSchedule/InstructorSchedule'
import { useSelector } from 'react-redux'

const SettingsPage = () => {
  const { components } = useSelector(state => state.variables)
  return (
    <div className={s.settings}>
      {components.instructorSchedule && <InstructorSchedule />}
    </div>
  )
}

export default SettingsPage
