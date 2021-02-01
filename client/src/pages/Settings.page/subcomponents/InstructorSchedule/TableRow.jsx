import React from 'react'
import s from './InstructorSchedule.module.sass'
import {
  setChangedCells,
  setSchedule,
} from '../../../../redux/actions/SettingsPage.actions'
import { useDispatch, useSelector } from 'react-redux'
import { dateByWeekDayAndHour } from '../../../../utils/date'
import TableCell from '../../../../components/TableCell/TableCell'

const TableRow = ({ hour, activeWeek, activeMode, isEditableView }) => {
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

  const isPastTime = dayIdx => {
    return (
      activeMode.value === 'current' &&
      new Date().getTime() -
        dateByWeekDayAndHour(activeWeek[0], dayIdx, hour).getTime() >
        0
    )
  }

  const cellClass = candidate => {
    return `${
      Object.keys(candidate).length
        ? candidate.disabled
          ? s.disabled
          : s.no_active
        : s.active
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
            <TableCell
              key={candidate.id}
              isButton={
                !candidate.disabled && !isPastTime(dayIdx) && isEditableView
              }
              isTranslucentView={isPastTime(dayIdx)}
              isDisabledView={candidate.disabled}
              isActiveView={!Object.keys(candidate).length}
              onClick={() => toggleCellState(hour, dayIdx + 1)}
            >
              {candidate.name && (
                <>
                  <p className={s.rented_info}>{candidate.name}</p>
                  <p className={s.rented_info}>{candidate.practiceMode}</p>
                </>
              )}
            </TableCell>
          )
        })}
    </tr>
  )
}

export default TableRow
