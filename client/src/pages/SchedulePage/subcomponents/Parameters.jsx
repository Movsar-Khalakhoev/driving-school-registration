import React, { useEffect } from 'react'
import s from '../SchedulePage.module.sass'
import DatePicker from 'react-date-picker'
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader'
import Select from 'react-select'
import {
  changeDate,
  changeInstructor,
  changePracticeMode,
} from '../../../redux/actions/schedule.action'
import { useDispatch, useSelector } from 'react-redux'
import { addMonth, dateWithoutTime } from '../../../utils/date'
import useDispatchWithHttp from '../../../hooks/dispatchWithHttp.hook'
import {
  getInstructors,
  getPracticeModes,
} from '../../../redux/actions/GENERAL.actions'

const Parameters = () => {
  const maxDate = addMonth()
  const dispatch = useDispatch()
  const { activeInstructor } = useSelector(state => state.schedule)
  const { activePracticeMode } = useSelector(state => state.schedule)
  const { activeDate } = useSelector(state => state.schedule)
  const { instructors, practiceModes } = useSelector(state => state.general)
  const [dispatchInstructors, isLoadingInstructors] = useDispatchWithHttp()
  const [dispatchPracticeModes, isLoadingPracticeModes] = useDispatchWithHttp()
  const selectStyles = {
    placeholder: base => ({
      ...base,
      width: '100%',
      paddingRight: 10,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }),
  }

  const changeDateHandler = value => {
    if (!value) return
    if (value.toString() === activeDate.toString()) return

    dispatch(changeDate(value))
  }

  const changeModeHandler = mode => {
    if (!mode.value) return
    if (activePracticeMode.value) {
      if (mode.value.toString() === activePracticeMode.value.toString()) {
        return false
      }
    }

    dispatch(changePracticeMode(mode))
  }

  const changeInstructorHandler = instructor => {
    if (!instructor.value) return
    if (activeInstructor.value) {
      if (instructor.value.toString() === instructor.toString()) return false
    }

    dispatch(changeInstructor(instructor))
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
        value={activeDate}
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
          defaultValue={activePracticeMode.value ? activePracticeMode : null}
          placeholder='Выберите режим'
          styles={selectStyles}
        />
      </SkeletonLoader>
      <SkeletonLoader loading={isLoadingInstructors} className={s.instructors}>
        <Select
          onChange={changeInstructorHandler}
          options={instructors}
          defaultValue={activeInstructor.value ? activeInstructor : null}
          placeholder='Выберите инструктора'
          styles={selectStyles}
        />
      </SkeletonLoader>
    </div>
  )
}

export default Parameters
