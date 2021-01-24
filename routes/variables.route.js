const { Router } = require('express')
const settings = require('../config/settings.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    const { maxWeeksNum, forRentHoursInterval } = settings

    res.json({ variables: { maxWeeksNum, forRentHoursInterval } })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
