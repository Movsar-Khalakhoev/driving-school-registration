const { Router } = require('express')
const User = require('../models/User')
const settings = require('../config/settings.json')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')

const router = Router()

router.get('/', auth, roles, (req, res) => {
  try {
    const { maxWeeksNum, forRentHoursInterval } = settings

    res.json({ variables: { maxWeeksNum, forRentHoursInterval } })
  } catch (e) {
    console.log(e)
  }
})

router.get('/components', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('roles', {
      components: 1,
      level: 1,
    })

    let components = {}
    let rolesMaxLevel = null
    user.roles.forEach(role => {
      if (rolesMaxLevel === null) {
        rolesMaxLevel = role.level
      }

      if (role.level < rolesMaxLevel) {
        components = { ...components, ...role._doc.components }
        rolesMaxLevel = role.level
      } else {
        components = { ...role._doc.components, ...components }
      }
    })

    res.json({ components })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
