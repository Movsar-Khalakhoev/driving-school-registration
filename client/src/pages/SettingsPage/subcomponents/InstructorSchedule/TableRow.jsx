import React from 'react'
import s from './InstrucrorSchedule.module.sass'
import {
  setChangedCells,
  setSchedule,
} from '../../../../redux/actions/settings.action'
import { useDispatch, useSelector } from 'react-redux'
import { dateByWeekDayAndHour } from '../../../../utils/date'

const TableRow = ({ hour, activeWeek, activeMode }) => {
  const dispatch = useDispatch()
  const { schedule, changedCells } = useSelector(
    state => state.settings.schedule
  )

  const toggleCellState = (hour, day) => {
    const changeIdx = changedCells.findIndex(
      c => c.hour === hour && c.weekDay === day
    )
    if (changeIdx === -1)
      dispatch(setChangedCells([...changedCells, { hour, weekDay: day }]))
    else
      dispatch(
        setChangedCells(
          changedCells.filter(c => c.hour !== hour || c.weekDay !== day)
        )
      )

    const candidateIdx = schedule.findIndex(
      c => c.weekDay === day && c.hour === hour
    )
    if (candidateIdx === -1) {
      return dispatch(setSchedule([...schedule, { hour, weekDay: day }]))
    }
    const newCells = [
      ...schedule.slice(0, candidateIdx),
      ...schedule.slice(candidateIdx + 1),
    ]
    dispatch(setSchedule(newCells))
  }

  const cellClasses = (candidate, dayIdx) => {
    return `${s.cell} ${
      Object.keys(candidate).length
        ? candidate.disabled
          ? s.disabled
          : s.no_active
        : s.active
    }
    ${
      activeMode.value === 'current' &&
      new Date().getTime() -
        dateByWeekDayAndHour(activeWeek[0], dayIdx, hour).getTime() >
        0
        ? s.past
        : ''
    }`
  }

  return (
    <tr key={hour}>
      <th className={s.cell}>{`${hour}:00 - ${hour + 1}:00`}</th>
      {Array(7)
        .fill('')
        .map((day, dayIdx) => {
          const candidate =
            schedule.find(c => c.hour === hour && c.weekDay === dayIdx + 1) ||
            {}
          return (
            <th key={dayIdx} className={cellClasses(candidate, dayIdx)}>
              {candidate.name && (
                <>
                  <p className={s.rented_info}>{candidate.name}</p>
                  <p className={s.rented_info}>{candidate.practiceMode}</p>
                </>
              )}
              {!candidate.disabled && (
                <button
                  onClick={() => toggleCellState(hour, dayIdx + 1)}
                  className={s.toggle_mode}
                />
              )}
            </th>
          )
        })}
    </tr>
  )
}

export default TableRow
