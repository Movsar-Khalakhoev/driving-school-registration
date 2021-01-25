const { Router } = require('express')
const router = Router()
const Interval = require('../models/Interval')
const User = require('../models/User')
const PracticeMode = require('../models/PracticeMode')
const auth = require('../middlewares/auth.middleware')
const settings = require('../config/settings.json')
const { todayWithoutTime } = require('../utils/date')
const { addDay, getWeekInterval, dateByWeekDay } = require('../utils/date')

router.get('/:date/:instructor/:mode', auth, async (req, res) => {
  try {
    const date = new Date(req.params.date)
    let instructor = await User.findById(req.params.instructor, {
      settings: 1,
    }).populate('settings')

    let { periodicSchedule, currentSchedule } = instructor.settings

    let intervals = await Interval.find(
      {
        timestamp: {
          $gte: date,
          $lte: addDay(date),
        },
        instructor: req.params.instructor,
      },
      { timestamp: 1, name: 1, _id: 0 }
    )

    const activeWeek = getWeekInterval(date)

    periodicSchedule = periodicSchedule.filter(({ weekDay }) => {
      return (
        date.getDate() === dateByWeekDay(activeWeek[0], weekDay - 1).getDate()
      )
    })

    currentSchedule = currentSchedule.filter(
      ({ timestamp }) =>
        todayWithoutTime(timestamp).getTime() === date.getTime()
    )

    intervals = [
      ...intervals,
      ...currentSchedule.map(({ timestamp }) => ({
        name: '',
        timestamp,
      })),
      ...periodicSchedule.map(({ hour, weekDay }) => ({
        name: '',
        timestamp: dateByWeekDay(
          activeWeek[0],
          weekDay - 1,
          hour
        ).toISOString(),
      })),
    ]

    console.log(intervals)
    return res.json({ schedule: intervals, hoursToRent: settings.hoursToRent })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { timestamp, instructor, practiceMode } = req.body
    const date = new Date(timestamp)
    const weekInterval = getWeekInterval(date)
    let intervalsInWeek = await Interval.find({
      user: req.user,
      timestamp: {
        $gte: weekInterval[0],
        $lte: weekInterval[1],
      },
    })

    const maxInWeek = settings.maxRentedInWeek
    if (intervalsInWeek.length >= maxInWeek) {
      return res.status(400).json({
        message: `Максимальное число бронирований в неделю - ${maxInWeek}`,
      })
    }

    const intervalsInDay = intervalsInWeek.filter(
      item => date.getDate() === new Date(item.timestamp).getDate()
    )

    console.log(intervalsInDay)

    const maxInDay = settings.maxRentedInDay
    if (intervalsInDay.length >= maxInDay) {
      return res.status(400).json({
        message: `Максимальное число бронирований в день - ${maxInDay}`,
      })
    }

    const hour = {
      timestamp,
      user: req.user,
      name: req.user.name,
      practiceMode,
      instructor,
    }

    const interval = new Interval(hour)

    await interval.save()

    return res.json({
      hour: {
        timestamp,
        name: hour.name,
      },
      message: 'Забронировано успешно!',
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так...' })
  }
})

router.get('/instructors', async (req, res) => {
  try {
    let instructors = await User.find(
      { roles: '600e5f57e9732c401c66c712' },
      { name: 1, _id: 1 }
    )

    instructors = instructors.map(i => ({ value: i._id, label: i.name }))
    return res.json({ instructors })
  } catch (e) {
    console.log(e)
  }
})

router.get('/practice-modes', async (req, res) => {
  let practiceModes = await PracticeMode.find({}, { __v: 0 })

  practiceModes = practiceModes.map(p => ({ value: p._id, label: p.label }))

  res.json({ practiceModes })
})

router.post('/practice-modes', async (req, res) => {
  const practiceMode = new PracticeMode({
    label: req.body.label,
  })

  await practiceMode.save()

  res.json({ message: 'Режим занятий создан успешно!' })
})

module.exports = router
