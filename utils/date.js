exports.getWeekInterval = function (date = new Date()) {
  // Возвращает интервал от старта до конца заданной недели
  if (typeof date === 'string') {
    date = new Date(date)
  }

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

exports.todayWithoutTime = function (date = new Date()) {
  date = new Date(date)

  return new Date(date.setHours(0))
}

exports.addDay = function (date = new Date()) {
  return new Date(new Date(date).setDate(new Date(date).getDate() + 1))
}

exports.dateByWeekDay = function (
  activeWeekStart,
  day = 1,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) {
  // Возвращает дату, если указать старт текущей недели, день недели и время
  return new Date(
    new Date(
      new Date(activeWeekStart).setDate(activeWeekStart.getDate() + day)
    ).setHours(hours, minutes, seconds, milliseconds)
  )
}
