const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')
const User = require('../models/User')
const Role = require('../models/Role')
const PracticeMode = require('../models/PracticeMode')
const router = Router()

router.get('/instructors', auth, roles, async (req, res) => {
  try {
    let instructors = await User.find(
      { roles: '600e5f57e9732c401c66c712' },
      { name: 1, _id: 1 }
    )

    instructors = instructors.map(i => ({ value: i._id, label: i.name }))
    return res.json({ instructors })
  } catch (e) {}
})

router.get('/practice-modes', auth, roles, async (req, res) => {
  try {
    let practiceModes = await PracticeMode.find({}, { __v: 0 })

    practiceModes = practiceModes.map(p => ({ value: p._id, label: p.label }))

    res.json({ practiceModes })
  } catch (e) {}
})

router.get('/all-roles', auth, roles, async (req, res) => {
  try {
    const roles = await Role.find()

    res.json({ roles })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
