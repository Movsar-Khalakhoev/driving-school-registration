import React from 'react'
import s from './InstrucrorSchedule.module.sass'
import { useSelector } from 'react-redux'

const TableHead = ({ activeWeek, activeMode }) => {
  const { weekDayLabels } = useSelector(state => state.settings.schedule)
  return (
    <thead>
      <tr>
        <th className={s.cell}> </th>
        {weekDayLabels.map((day, index) => (
          <th className={s.cell} key={index}>
            {activeMode.value === 'current' &&
              (activeWeek[0].daysInMonth() - activeWeek[0].getDate() < 0
                ? `${activeWeek[1].getDate() + index}
                           ${activeWeek[1]
                             .toLocaleString('ru', { month: 'long' })
                             .slice(0, 3)}./ `
                : `${activeWeek[0].getDate() + index}
                           ${activeWeek[0]
                             .toLocaleString('ru', { month: 'long' })
                             .slice(0, 3)}./ `)}
            {day[activeMode.value === 'periodic' ? 0 : 1]}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
