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
  } catch (e) {}
})

router.get('/components', auth, roles, async (req, res) => {
  try {
    res.json({ components: req.user.components })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
