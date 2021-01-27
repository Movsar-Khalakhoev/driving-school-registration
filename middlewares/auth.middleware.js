const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401)
    }

    const payload = jwt.verify(token, config.SECRET_KEY)

    if (payload) {
      req.user = payload.user
    } else {
      return res.status(401)
    }

    next()
  } catch (e) {
    console.log(e)
    res.status(401)
  }
}
