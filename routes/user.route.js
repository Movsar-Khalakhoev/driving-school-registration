const { Router } = require('express')
const router = Router()
const User = require('../models/User')
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
  } catch (e) {
    console.log(e)
  }
})

router.get('/modes', async (req, res) => {
  try {
    console.log('fetched')
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
  } catch (e) {
    console.log(e)
  }
})

router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { __v: 0, password: 0 })

    res.json({ user })
  } catch (e) {
    console.log(e)
  }
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
  } catch (e) {
    console.log(e)
  }
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
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
