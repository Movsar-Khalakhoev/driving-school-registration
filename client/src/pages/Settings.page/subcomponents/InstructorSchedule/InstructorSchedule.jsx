import React, { useState, useEffect } from 'react'
import s from './InstructorSchedule.module.sass'
import Parameters from './Parameters'
import {
  getSettingsCurrentSchedule,
  getSettingsPeriodicSchedule,
  setChangedCells,
  setSchedule,
  setSettingsCurrentSchedule,
  setSettingsPeriodicSchedule,
} from '../../../../redux/actions/SettingsPage.actions'
import { useDispatch, useSelector } from 'react-redux'
import useDispatchWithHttp from '../../../../hooks/dispatchWithHttp.hook'
import { dateByWeekDayAndHour, getWeekInterval } from '../../../../utils/date'
import Table from '../Table/Table'

const InstructorSchedule = ({ isEditableView, isViewSomeInstructors }) => {
  const dispatch = useDispatch()
  const {
    schedule,
    changedCells,
    activeMode,
    activeInstructor,
    weekDayLabels,
  } = useSelector(state => state.settings.schedule)
  const { forRentHoursInterval } = useSelector(
    state => state.variables.variables
  )
  const [dispatchSchedule, isLoadingSchedule] = useDispatchWithHttp()
  const [activeWeek, setActiveWeek] = useState(() => getWeekInterval())
  const intervals = [
    ...Array(forRentHoursInterval[1] - forRentHoursInterval[0]).keys(),
  ]

  const fetchChangesHandler = () => {
    if (changedCells.length) {
      activeMode.value === 'periodic'
        ? dispatchSchedule(setSettingsPeriodicSchedule, [
            changedCells,
            activeInstructor.value,
          ])
        : dispatchSchedule(setSettingsCurrentSchedule, [
            changedCells,
            activeInstructor.value,
            activeWeek[0],
          ])
    }
  }

  const toggleCellState = ({ hour, weekDay }) => {
    const candidateIdx = schedule.findIndex(
      c => c.weekDay === weekDay && c.hour === hour
    )
    if (candidateIdx === -1) {
      return dispatch(setSchedule([...schedule, { hour, weekDay }]))
    }
    const newCells = [
      ...schedule.slice(0, candidateIdx),
      ...schedule.slice(candidateIdx + 1),
    ]
    dispatch(setSchedule(newCells))
  }

  const getTableHeadLabels = () => {
    return weekDayLabels.map((day, index) => {
      return (
        <>
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
        </>
      )
    })
  }

  const getTableRows = () => {
    return intervals.map((interval, hourIndex) => ({
      title: `${hourIndex + forRentHoursInterval[0]}:00 - ${
        hourIndex + forRentHoursInterval[0] + 1
      }:00`,
      cells: weekDayLabels.map((label, dayIndex) => {
        const candidate =
          schedule.find(c => {
            return (
              c.hour === hourIndex + forRentHoursInterval[0] &&
              c.weekDay === dayIndex + 1
            )
          }) || {}
        return {
          isActiveView: !Object.keys(candidate).length,
          isTranslucentView: isPastTime(
            dayIndex,
            hourIndex + forRentHoursInterval[0]
          ),
          isDisabledView: candidate.disabled,
          isButton: !candidate.disabled && isEditableView,
          isUserInfo: !!candidate.name,
          userInfo: {
            name: candidate.name,
            practiceMode: candidate.practiceMode,
          },
          data: {
            hour: hourIndex + forRentHoursInterval[0],
            weekDay: dayIndex + 1,
          },
        }
      }),
    }))
  }

  const isPastTime = (dayIdx, hour) => {
    return (
      activeMode.value === 'current' &&
      new Date().getTime() -
        dateByWeekDayAndHour(activeWeek[0], dayIdx, hour).getTime() >
        0
    )
  }

  useEffect(() => {
    if (isViewSomeInstructors && !activeInstructor.value) {
      return
    }

    activeMode.value === 'periodic'
      ? dispatchSchedule(getSettingsPeriodicSchedule, [
          activeInstructor,
          isEditableView,
        ])
      : dispatchSchedule(getSettingsCurrentSchedule, [
          activeWeek,
          activeInstructor,
          isEditableView,
        ])
  }, [activeMode, activeWeek, activeInstructor])

  return (
    <div>
      <h2 className='settings_header'>Таблица расписания инструкторов</h2>
      <Parameters
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        activeMode={activeMode}
        isEditableView={isEditableView}
        isViewSomeInstructors={isViewSomeInstructors}
      />
      {(isEditableView && !isViewSomeInstructors) ||
      (isViewSomeInstructors && activeInstructor.value) ? (
        <Table
          isLoading={true}
          head={getTableHeadLabels()}
          rows={getTableRows()}
          changedCells={changedCells}
          setChangedCells={cells => dispatch(setChangedCells(cells))}
          changeItemsState={toggleCellState}
        />
      ) : (
        <p className={s.warning}>Выберите инструктора</p>
      )}
      {isEditableView && (
        <button
          className={`${s.save} btn_1`}
          onClick={fetchChangesHandler}
          disabled={isLoadingSchedule}
        >
          Сохранить
        </button>
      )}
    </div>
  )
}

export default InstructorSchedule
