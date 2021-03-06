const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken.model')
const crypto = require('crypto')
const Joi = require('joi')
const validateRequest = require('../middlewares/validate-request.middleware')
const auth = require('../middlewares/auth.middleware')
const config = require('../config')

const router = Router()

router.post('/', loginSchema, login)
router.post('/refresh-token', refreshToken)
router.post('/revoke-token', auth, revokeToken)

async function login(req, res) {
  try {
    const { login, password } = req.body

    const candidate = await User.findOne({ login }).populate('roles', {
      components: 0,
    })

    if (!candidate) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isCorrect = await bcrypt.compare(password, candidate.password)

    if (!isCorrect) {
      return res.status(400).json({ message: 'Неправильный пароль' })
    }

    const accessToken = generateAccessToken(candidate)
    const refreshToken = generateRefreshToken(candidate, req.ip)

    await refreshToken.save()
    setTokenCookie(res, refreshToken.token)

    return res.json({ token: accessToken, userId: candidate._id })
  } catch (e) {
    res.status(500).json({ message: 'Server Error' })
  }
}
function loginSchema(req, res, next) {
  const schema = Joi.object({
    login: Joi.string()
      .pattern(new RegExp(/\+\d \(\d{3}\) \d{3} \d{2} \d{2}/))
      .required(),
    password: Joi.string().min(6).max(22).required(),
  })

  validateRequest(req, res, next, schema)
}

async function refreshToken(req, res) {
  try {
    const token = req.cookies.refreshToken

    if (!token || token === 'logout') {
      return res.status(400).json({ message: 'Refresh-токен отсутствует!' })
    }

    let oldRefreshToken = await RefreshToken.findOne({
      token,
    }).populate('user')

    if (!oldRefreshToken) {
      return res.status(400).json({ message: 'Такой refresh-токен не найден!' })
    }

    if (oldRefreshToken.createdByIp !== req.ip) {
      return res.status(400).json({ message: 'Ошибка доступа' })
    }

    if (!oldRefreshToken.isActive) {
      await oldRefreshToken.remove()
      return res.status(400).json({
        message:
          'Время действия refresh-токена истекло. Повторно авторизуйтесь!',
      })
    }

    const newRefreshToken = generateRefreshToken(oldRefreshToken.user, req.ip)
    const accessToken = generateAccessToken(oldRefreshToken.user)

    await oldRefreshToken.remove()
    await newRefreshToken.save()

    setTokenCookie(res, newRefreshToken.token)
    res.json({ token: accessToken, userId: oldRefreshToken.user._id })
  } catch (e) {}
}

async function revokeToken(req, res) {
  try {
    const token = req.cookies.refreshToken
    const deleter = await RefreshToken.deleteOne({ token })

    if (!deleter.deletedCount) {
      res.status(400).json({ message: 'Такой токен не найден!' })
    }

    setTokenCookie(res, 'logout')
    res.json({ message: 'Токен успешно удалён!' })
  } catch (e) {}
}

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }
  res.cookie('refreshToken', token, cookieOptions)
}
function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, config.SECRET_KEY, {
    expiresIn: '1h',
  })
}
function generateRefreshToken(user, ipAddress) {
  // create a refresh token that expires in 7 days
  return new RefreshToken({
    user: user._id,
    token: crypto.randomBytes(40).toString('hex'),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  })
}

module.exports = router
