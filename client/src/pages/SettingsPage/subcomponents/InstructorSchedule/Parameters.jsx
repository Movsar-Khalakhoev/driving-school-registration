import React, { useState } from 'react'
import s from './InstrucrorSchedule.module.sass'
import Select from 'react-select'
import { addWeek, getWeekInterval, subWeek } from '../../../../utils/date'
import { changeMode } from '../../../../redux/actions/settings.action'
import { useDispatch, useSelector } from 'react-redux'

const Parameters = ({ activeWeek, setActiveWeek, activeMode }) => {
  const dispatch = useDispatch()
  const { maxWeeksNum } = useSelector(state => state.variables.variables)
  const { modes } = useSelector(state => state.settings.schedule)

  const [weekNum, setWeekNum] = useState(1)

  const incrementActiveWeekHandler = () => {
    setWeekNum(prev => prev + 1)
    setActiveWeek(getWeekInterval(addWeek(activeWeek[0])))
  }

  const decrementActiveWeekHandler = () => {
    setWeekNum(prev => prev - 1)
    setActiveWeek(getWeekInterval(subWeek(activeWeek[0])))
  }

  const changeModeHandler = mode => dispatch(changeMode(mode))

  return (
    <div className={s.parameters}>
      <Select
        className={s.mode}
        onChange={changeModeHandler}
        defaultValue={activeMode}
        options={modes}
      />
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
