Date.prototype.daysInMonth = function () {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
}

export const getWeekInterval = function (date = new Date()) {
  if (typeof date === 'string') date = new Date(date)

  const startDay = new Date(
    new Date(
      new Date(date).setDate(date.getDate() - (date.getDay() || 7) + 1)
    ).setHours(0, 0, 0, 0)
  )
  const endDay = new Date(
    new Date(new Date(date).setDate(startDay.getDate() + 7)).setHours(
      0,
      0,
      0,
      0
    )
  )

  return [startDay, endDay]
}

export const addWeek = function (date) {
  const calcDate = new Date(date)
  const diff = calcDate.daysInMonth() - calcDate.getDate() - 7

  if (diff < 0) {
    calcDate.setMonth(calcDate.getMonth() + 1)
    calcDate.setDate(Math.abs(diff))
  } else if (diff >= 0) {
    calcDate.setDate(calcDate.getDate() + 7)
  }

  return calcDate
}

export const subWeek = function (date) {
  const calcDate = new Date(date)
  const diff = calcDate.getDate() - 7

  if (diff < 0) {
    calcDate.setMonth(calcDate.getMonth() - 1)
    calcDate.setDate(calcDate.daysInMonth() + diff)
  } else {
    calcDate.setDate(diff)
  }

  return calcDate
}

export const addMonth = function (date = new Date()) {
  return new Date(
    date.setMonth(new Date(new Date().setHours(0, 0, 0, 0)).getMonth() + 1)
  )
}

export const dateByWeekDayAndHour = function (activeWeekStart, day, hour) {
  // Возвращает дату, если указать старт текущей недели, день недели и текущий час
  return new Date(
    new Date(
      new Date(activeWeekStart).setDate(activeWeekStart.getDate() + day)
    ).setHours(hour)
  )
}

export const dateWithoutTime = function (date = new Date()) {
  // Возвращает сегодняшнюю дату с обнуленными часами, минутами, секундами, миллисекундами
  return new Date(date.setHours(0, 0, 0, 0))
}
