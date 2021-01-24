const { Router } = require('express')
const router = Router()
const Settings = require('../models/Settings')
const Interval = require('../models/Interval')
const auth = require('../middlewares/auth.middleware')
const { toggleInterval } = require('../utils/settings.auxiliary')

router.get('/schedule/periodic', auth, async (req, res) => {
  const candidate = await Settings.findOne(
    { owner: req.user._id },
    { periodicSchedule: 1 }
  )

  if (candidate) {
    return res.json({ schedule: candidate.periodicSchedule })
  }

  const settings = new Settings({
    owner: req.user._id,
  })

  await settings.save()

  res.json({ schedule: [] })
})

router.get('/schedule/current/:interval', auth, async (req, res) => {
  try {
    const candidate = await Settings.findOne(
      { owner: req.user._id },
      { periodicSchedule: 1, currentSchedule: 1 }
    )

    if (candidate) {
      const [start, end] = req.params.interval.split('-')
      let rentedIntervals = await Interval.find(
        {
          timestamp: {
            // $gte: new Date() > new Date(+start) ? new Date() : new Date(+start)
            $gte: new Date(+start),
            $lte: new Date(+end),
          },
          instructor: req.user._id,
        },
        { timestamp: 1, name: 1 }
      ).populate('practiceMode')

      rentedIntervals = rentedIntervals.map(interval => ({
        name: interval.name,
        hour: new Date(interval.timestamp).getHours(),
        weekDay: new Date(interval.timestamp).getDay() || 7,
        practiceMode: interval.practiceMode.label,
        disabled: true,
      }))

      const intervalTemplate = (item, isDisabled) => ({
        id: item._id,
        hour: item.hour,
        weekDay: item.weekDay,
        disabled: isDisabled,
      })

      candidate.periodicSchedule.forEach(item => {
        if (
          !rentedIntervals.find(
            interval =>
              interval.hour === item.hour && interval.weekDay === item.weekDay
          )
        ) {
          rentedIntervals.push(intervalTemplate(item, true))
        }
      })

      candidate.currentSchedule.forEach(interval => {
        console.log(
          new Date(interval.timestamp),
          new Date(+start),
          new Date(+end)
        )
        if (
          new Date(interval.timestamp) > new Date(+start) &&
          new Date(interval.timestamp) < new Date(+end)
        ) {
          console.log(intervalTemplate(interval, false))
          rentedIntervals.push(intervalTemplate(interval, false))
        }
      })

      return res.json({ schedule: rentedIntervals })
    }

    const settings = new Settings({
      owner: req.user._id,
    })

    await settings.save()

    res.json({ schedule: [] })
  } catch (e) {
    console.log(e)
  }
})

router.post('/schedule/periodic', auth, async (req, res) => {
  try {
    const settings = await Settings.findOne(
      { owner: req.user._id },
      { periodicSchedule: 1, currentSchedule: 1 }
    )

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.periodicSchedule, item)

      if (filtered) {
        return (settings.periodicSchedule = filtered)
      }

      settings.periodicSchedule.push(item)
    })

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.currentSchedule, item)

      if (filtered) {
        return (settings.currentSchedule = filtered)
      }
    })

    await settings.save()
    return res.json({
      message: 'Настройки успешно сохранены!',
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/schedule/current', auth, async (req, res) => {
  try {
    const settings = await Settings.findOne({ owner: req.user })

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.currentSchedule, item)

      if (filtered) {
        return (settings.currentSchedule = filtered)
      }

      settings.currentSchedule.push(item)
    })

    await settings.save()

    res.json({ message: 'Настройки успешно сохранены!' })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
