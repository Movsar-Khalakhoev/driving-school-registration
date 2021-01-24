import React, { useEffect } from 'react'
import s from '../SchedulePage.module.sass'
import DatePicker from 'react-date-picker'
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader'
import Select from 'react-select'
import {
  changeInstructor,
  changePracticeMode,
  getInstructors,
  getPracticeModes,
} from '../../../redux/actions/schedule.action'
import { useDispatch, useSelector } from 'react-redux'
import { addMonth, dateWithoutTime } from '../../../utils/date'
import useDispatchWithHttp from '../../../hooks/dispatchWithHttp.hook'

const Parameters = ({ scheduleDate, setScheduleDate }) => {
  const maxDate = addMonth()
  const dispatch = useDispatch()
  const { instructors, active: instructor } = useSelector(
    state => state.schedule.instructors
  )
  const { practiceModes, active: practiceMode } = useSelector(
    state => state.schedule.practiceModes
  )
  const [dispatchInstructors, isLoadingInstructors] = useDispatchWithHttp()
  const [dispatchPracticeModes, isLoadingPracticeModes] = useDispatchWithHttp()

  const changeDateHandler = value => {
    if (!value) return
    if (value.toString() === scheduleDate.toString()) return

    setScheduleDate(value)
  }

  const changeModeHandler = m => {
    if (!m.value) return
    if (practiceMode.value) {
      if (m.value.toString() === practiceMode.value.toString()) {
        return false
      }
    }

    dispatch(changePracticeMode(m))
  }

  const changeInstructorHandler = i => {
    if (!i.value) return
    if (instructor.value) {
      if (i.value.toString() === i.toString()) return false
    }

    dispatch(changeInstructor(i))
  }

  useEffect(() => dispatchInstructors(getInstructors), [dispatchInstructors])

  useEffect(() => dispatchPracticeModes(getPracticeModes), [
    dispatchPracticeModes,
  ])

  return (
    <div className={s.parameters}>
      <DatePicker
        className={s.datepicker}
        onChange={changeDateHandler}
        value={scheduleDate}
        format='dd-MM-yyyy'
        minDate={dateWithoutTime()}
        maxDate={maxDate}
        clearIcon={null}
      />

      <SkeletonLoader
        loading={isLoadingPracticeModes}
        className={s.practice_mode}
      >
        <Select
          onChange={changeModeHandler}
          options={practiceModes}
          defaultValue={practiceMode.value ? practiceMode : null}
          placeholder='Выберите режим'
        />
      </SkeletonLoader>
      <SkeletonLoader loading={isLoadingInstructors} className={s.instructors}>
        <Select
          onChange={changeInstructorHandler}
          options={instructors}
          defaultValue={instructor.value ? instructor : null}
          placeholder='Выберите инструктора'
        />
      </SkeletonLoader>
    </div>
  )
}

export default Parameters
