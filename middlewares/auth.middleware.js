const User = require('../models/User')
const jwt = require('express-jwt')
const { SECRET_KEY } = require('../config/index')

module.exports = [
  jwt({ secret: SECRET_KEY, algorithms: ['HS256'] }),
  async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }
    try {
      const candidate = await User.findById(req.user.userId).populate({
        path: 'roles',
        populate: {
          path: 'permissions',
        },
      })

      if (!candidate) {
        return res.status(400).json({ message: 'Неправильный id пользователя' })
      }

      req.user.roles = candidate.roles
      req.user.name = candidate.name

      next()
    } catch (e) {
      console.log(e)
    }
  },
]
