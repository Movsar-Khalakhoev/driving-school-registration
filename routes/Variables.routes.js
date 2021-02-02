const { Router } = require('express')
const settings = require('../config/settings.json')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')

const router = Router()

router.get('/', auth, roles, getVariables)
router.get('/components', auth, roles, getComponentsList)

function getVariables(req, res) {
  try {
    const { maxWeeksNum, forRentHoursInterval } = settings

    res.json({ variables: { maxWeeksNum, forRentHoursInterval } })
  } catch (e) {}
}

async function getComponentsList(req, res) {
  try {
    res.json({ components: req.user.components })
  } catch (e) {}
}

module.exports = router
