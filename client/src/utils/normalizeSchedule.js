const normalizeSchedule = (
  forRentHoursInterval,
  date,
  origSchedule,
  hoursToRent
) => {
  const schedule = []

  for (let i = forRentHoursInterval[0]; i < forRentHoursInterval[1]; i++) {
    const interval = `${i}:00 - ${i + 1}:00`
    const timestamp = new Date(new Date(date).setHours(i))

    const rentedInterval =
      origSchedule.find(item => {
        return new Date(item.timestamp).getHours() === i
      }) || {}

    const hourInterval = {
      interval,
      timestamp: timestamp.toISOString(),
      isRentable:
        (timestamp - new Date()) / (1000 * 60 * 60) > hoursToRent &&
        !Object.keys(rentedInterval).length,
      id: i,
      name: rentedInterval.name,
    }

    schedule.push(hourInterval)
  }

  return schedule
}

export default normalizeSchedule
