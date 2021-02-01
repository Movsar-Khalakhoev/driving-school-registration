import React from 'react'
import s from './Settings.module.sass'
import InstructorSchedule from './subcomponents/InstructorSchedule/InstructorSchedule'
import { useSelector } from 'react-redux'
import FunctionalitiesController from './subcomponents/FunctionalitiesController/FunctionalitiesController'

const SettingsPage = () => {
  const { components } = useSelector(state => state.variables)
  return (
    <div className={s.settings}>
      {components.instructorSchedule && (
        <InstructorSchedule
          isEditableView={components.isEditableViewOfInstructorSchedule}
        />
      )}
      <FunctionalitiesController />
    </div>
  )
}

export default SettingsPage
