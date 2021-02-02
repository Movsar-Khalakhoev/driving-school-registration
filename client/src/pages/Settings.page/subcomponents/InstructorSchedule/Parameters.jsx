import React, { useState, useEffect } from 'react'
import s from './InstructorSchedule.module.sass'
import Select from 'react-select'
import { addWeek, getWeekInterval, subWeek } from '../../../../utils/date'
import {
  changeInstructor,
  changeMode,
} from '../../../../redux/actions/SettingsPage.actions'
import { useDispatch, useSelector } from 'react-redux'
import SkeletonLoader from '../../../../components/SkeletonLoader/SkeletonLoader'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import { getInstructors } from '../../../../redux/actions/GENERAL.actions'

const Parameters = ({
  activeWeek,
  setActiveWeek,
  activeMode,
  isEditableView,
  isViewSomeInstructors,
}) => {
  const dispatch = useDispatch()
  const [dispatchInstructors, isLoadingInstructors] = useDispatchWithHttp()
  const { maxWeeksNum } = useSelector(state => state.variables.variables)
  const { modes, activeInstructor } = useSelector(
    state => state.settings.schedule
  )
  const { instructors } = useSelector(state => state.general)
  const [weekNum, setWeekNum] = useState(1)
  const selectStyles = {
    placeholder: base => ({
      ...base,
      paddingRight: 10,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }),
  }

  const incrementActiveWeekHandler = () => {
    setWeekNum(prev => prev + 1)
    setActiveWeek(getWeekInterval(addWeek(activeWeek[0])))
  }

  const decrementActiveWeekHandler = () => {
    setWeekNum(prev => prev - 1)
    setActiveWeek(getWeekInterval(subWeek(activeWeek[0])))
  }

  const changeModeHandler = mode => dispatch(changeMode(mode))
  const changeInstructorHandler = instructor =>
    dispatch(changeInstructor(instructor))

  useEffect(() => {
    if (!isEditableView) {
      dispatchInstructors(getInstructors)
    }
  }, [dispatchInstructors, isEditableView])

  return (
    <div className={s.parameters}>
      <div className={s.selects_wrapper}>
        {isViewSomeInstructors && (
          <SkeletonLoader
            loading={isLoadingInstructors}
            className={s.instructors}
          >
            <Select
              onChange={changeInstructorHandler}
              options={instructors}
              defaultValue={activeInstructor.value ? activeInstructor : null}
              placeholder='Выберите инструктора'
              styles={selectStyles}
            />
          </SkeletonLoader>
        )}
        <Select
          className={s.mode}
          onChange={changeModeHandler}
          defaultValue={activeMode}
          options={modes}
          styles={selectStyles}
        />
      </div>
      {activeMode.value === 'current' && (
        <div className={s.weeks}>
          <button
            className={`${s.arrow} ${weekNum <= 1 && s.arrow_disabled}`}
            onClick={decrementActiveWeekHandler}
          >
            <i className='icofont-arrow-left' />
          </button>
          <span className={s.active_week}>
            {activeWeek[0].getDate()}-{activeWeek[1].getDate()}{' '}
            {activeWeek[0].toLocaleString('ru', { month: 'long' }).slice(0, 3)}.
            /{activeWeek[1].toLocaleString('ru', { month: 'long' }).slice(0, 3)}
            .
          </span>
          <button
            className={`${s.arrow} ${
              weekNum >= maxWeeksNum && s.arrow_disabled
            }`}
            onClick={incrementActiveWeekHandler}
          >
            <i className='icofont-arrow-right' />
          </button>
        </div>
      )}
    </div>
  )
}

export default Parameters
