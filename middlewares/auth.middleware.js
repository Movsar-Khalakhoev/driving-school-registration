const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

const auth = async (req, res, next) => {
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
      req.user = await User.findById(payload.userId)
    } else {
      return res.status(401)
    }

    next()
  } catch (e) {
    console.log(e)
    res.status(401)
  }
}

module.exports = auth
