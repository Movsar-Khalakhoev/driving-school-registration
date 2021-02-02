const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')
const User = require('../models/User')
const Role = require('../models/Role')
const PracticeMode = require('../models/PracticeMode')
const router = Router()

router.get('/instructors', auth, roles, getInstructors)
router.get('/practice-modes', auth, roles, getPracticeModes)
router.get('/all-roles', auth, roles, getAllRoles)

async function getInstructors(req, res) {
  try {
    let instructors = await User.find(
      { roles: '6016cb1f404e3f42dce06681' },
      { name: 1, _id: 1 }
    )

    instructors = instructors.map(i => ({ value: i._id, label: i.name }))
    return res.json({ instructors })
  } catch (e) {}
}

async function getPracticeModes(req, res) {
  try {
    let practiceModes = await PracticeMode.find({}, { __v: 0 })

    practiceModes = practiceModes.map(p => ({ value: p._id, label: p.label }))

    res.json({ practiceModes })
  } catch (e) {}
}

async function getAllRoles(req, res) {
  try {
    const roles = await Role.find()

    res.json({ roles })
  } catch (e) {}
}

module.exports = router
