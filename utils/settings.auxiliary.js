exports.toggleInterval = (schedule, item) => {
  const candidateIndex = schedule.findIndex(
    interval => interval.hour === item.hour && interval.weekDay === item.weekDay
  )

  if (candidateIndex !== -1) {
    return [
      ...schedule.slice(0, candidateIndex),
      ...schedule.slice(candidateIndex + 1),
    ]
  }
}
