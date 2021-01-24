const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const {login, password} = req.body

    const candidate = await User.findOne({login})

    if (!candidate) {
      return res.status(400).json({message: 'Пользователь не найден'})
    }

    const isCorrect = await bcrypt.compare(password, candidate.password)

    if (!isCorrect) {
      return res.status(400).json({message: 'Неправильный пароль'})
    }

    const token = jwt.sign(
      {userId: candidate._id},
      config.SECRET_KEY,
      {
        expiresIn: '100h'
      }
    )

    return res.json({token, userId: candidate._id})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
})

module.exports = router
