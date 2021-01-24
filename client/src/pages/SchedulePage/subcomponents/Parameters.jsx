import React from 'react'
import s from '../SchedulePage.module.sass'
import DatePicker from 'react-date-picker'
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader'
import Select from 'react-select'
import {
  changeInstructor,
  changePracticeMode,
} from '../../../redux/actions/schedule.action'
import { useDispatch, useSelector } from 'react-redux'
import { addMonth, dateWithoutTime } from '../../../utils/date'

const Parameters = ({ scheduleDate, setScheduleDate }) => {
  const maxDate = addMonth()
  const dispatch = useDispatch()
  const {
    loading: instructorsLoading,
    instructors,
    active: instructor,
  } = useSelector(state => state.schedule.instructors)
  const {
    loading: practiceModesLoading,
    practiceModes,
    active: practiceMode,
  } = useSelector(state => state.schedule.practiceModes)
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
        loading={practiceModesLoading}
        className={s.practice_mode}
      >
        <Select
          onChange={changeModeHandler}
          options={practiceModes}
          defaultValue={practiceMode.value ? practiceMode : null}
          placeholder='Выберите режим'
        />
      </SkeletonLoader>
      <SkeletonLoader loading={instructorsLoading} className={s.instructors}>
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
