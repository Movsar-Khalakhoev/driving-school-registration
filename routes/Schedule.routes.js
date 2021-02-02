const { Router } = require('express')
const router = Router()
const Interval = require('../models/Interval')
const User = require('../models/User')
const PracticeMode = require('../models/PracticeMode')
const Joi = require('joi')
const validateRequest = require('../middlewares/validate-request.middleware')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')
const settings = require('../config/settings.json')
const { todayWithoutTime } = require('../utils/date')
const { addDay, getWeekInterval, dateByWeekDay } = require('../utils/date')

router.get('/:date/:instructor/:mode', auth, roles, getSchedule)
router.post('/', auth, rentIntervalSchema, roles, rentInterval)
router.post('/practice-modes', auth, serPracticeMode, roles, setPracticeMode)

async function getSchedule(req, res) {
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

    return res.json({ schedule: intervals, hoursToRent: settings.hoursToRent })
  } catch (e) {}
}

async function rentInterval(req, res) {
  try {
    const { timestamp, instructor, practiceMode } = req.body
    const date = new Date(timestamp)
    const weekInterval = getWeekInterval(date)
    let intervalsInWeek = await Interval.find({
      user: req.user.userId,
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

    const maxInDay = settings.maxRentedInDay
    if (intervalsInDay.length >= maxInDay) {
      return res.status(400).json({
        message: `Максимальное число бронирований в день - ${maxInDay}`,
      })
    }

    const hour = {
      timestamp,
      user: req.user.userId,
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
    res.status(500).json({ message: 'Что-то пошло не так...' })
  }
}
function rentIntervalSchema(req, res, next) {
  const schema = Joi.object({
    timestamp: Joi.date().required(),
    instructor: Joi.string().not().empty().required(),
    practiceMode: Joi.string().not().empty().required(),
  })

  validateRequest(req, res, next, schema)
}

async function setPracticeMode(req, res) {
  const practiceMode = new PracticeMode({
    label: req.body.label,
  })

  await practiceMode.save()

  res.json({ message: 'Режим занятий создан успешно!' })
}
function serPracticeMode(req, res, next) {
  const schema = Joi.object({
    label: Joi.string().not().empty().required(),
  })

  validateRequest(req, res, next, schema)
}

module.exports = router
