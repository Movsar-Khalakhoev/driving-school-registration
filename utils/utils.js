const settings = require('../config/settings.json')

exports.isRevocable = timestamp => {
  const hours = settings.hoursToRevoke
  const now = new Date().getTime()
  const rentTime = new Date(timestamp).getTime()

  const hourDiff = (rentTime - now) / (1000 * 60 * 60)

  return hourDiff >= hours
}
