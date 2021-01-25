const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Settings = require('../models/Settings')
const Interval = require('../models/Interval')
const PracticeModes = require('../models/PracticeMode')
const auth = require('../middlewares/auth.middleware')
const { isRevocable } = require('../utils/utils')

router.get('/', async (req, res) => {
  try {
    let users = await User.find({}, { name: 1, roles: 1 }).populate('roles')

    users = users.map(user => ({
      roles: user.roles.map(role => role.label),
      name: user.name,
      id: user._id,
    }))

    res.json({ users })
  } catch (e) {}
})

router.get('/modes', async (req, res) => {
  try {
    const practiceModes = await PracticeModes.find({}, { __v: 0 })

    const modes = []

    practiceModes.forEach(mode => {
      modes.push({
        value: `${mode._id}/active`,
        label: `${mode.label}: активные`,
      })

      modes.push({
        value: `${mode._id}/no-active`,
        label: `${mode.label}: прошедшее`,
      })
    })

    res.json({ modes })
  } catch (e) {}
})

router.get('/delete-user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params

    const candidate = await User.findById(userId).populate('roles settings')

    if (!candidate) {
      return res
        .status(400)
        .json({ message: 'Пользователя с таким id не существует!' })
    }

    if (userId.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: 'Вы не можете удалить самого себя' })
    }

    const candidateMaxRoleLevel = Math.max(
      ...candidate.roles.map(role => role.level)
    )
    const userMaxRoleLevel = Math.max(...req.user.roles.map(role => role.level))

    if (candidateMaxRoleLevel <= userMaxRoleLevel) {
      return res
        .status(400)
        .json({ message: 'Вы не можете удалить этого пользователя' })
    }

    await User.deleteOne({ _id: userId })
    await Settings.deleteOne({ _id: candidate.settings._id })
    await Interval.deleteMany({
      $or: [{ instructor: userId }, { user: userId }],
    })

    res.json({ message: `Пользователь "${candidate.name}" успешно удален!` })
  } catch (e) {}
})

router.post('/delete-rent', auth, async (req, res) => {
  try {
    const { timestamp } = req.body
    await Interval.findOneAndDelete({
      timestamp,
      user: req.user._id,
    })

    res.json({ message: 'Бронирование отменено успешно!' })
  } catch (e) {}
})

router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { __v: 0, password: 0 })

    res.json({ user })
  } catch (e) {}
})

router.get('/:userId/:mode/active', auth, async (req, res) => {
  try {
    let practice = await Interval.find(
      {
        user: req.params.userId,
        timestamp: { $gte: new Date() },
        practiceMode: req.params.mode,
      },
      { _id: 1, timestamp: 1 }
    )

    practice = practice.map(practice => ({
      id: practice._id,
      timestamp: practice.timestamp,
      isRevocable: isRevocable(practice.timestamp),
      isActive: true,
    }))

    res.json({ schedule: practice })
  } catch (e) {}
})

router.get('/:userId/:mode/no-active', auth, async (req, res) => {
  try {
    let practice = await Interval.find(
      {
        user: req.params.userId,
        timestamp: { $lte: new Date() },
        practiceMode: req.params.mode,
      },
      { _id: 1, timestamp: 1 }
    )

    practice = practice.map(practice => ({
      _id: practice._id,
      timestamp: practice.timestamp,
      isActive: false,
    }))

    res.json({ schedule: practice })
  } catch (e) {}
})

module.exports = router
