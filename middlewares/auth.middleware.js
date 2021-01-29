// const jwt = require('jsonwebtoken')
// const config = require('../config')
//
// module.exports = (req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     return next()
//   }
//
//   try {
//     const token = req.headers.authorization.split(' ')[1]
//
//     if (!token) {
//       return res.status(401)
//     }
//
//     const payload = jwt.verify(token, config.SECRET_KEY)
//
//     if (payload) {
//       req.user = payload.user
//     } else {
//       return res.status(401)
//     }
//
//     next()
//   } catch (e) {
//     console.log(e)
//     res.status(401)
//   }
// }

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
      const candidate = await User.findById(req.user.userId).populate('roles', {
        components: 0,
      })

      if (!candidate) {
        return res.status(400).json({ message: 'Неправильный id пользователя' })
      }

      req.user.roles = candidate.roles

      next()
    } catch (e) {
      console.log(e)
    }
  },
]
