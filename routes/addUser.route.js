const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Role = require('../models/Role')
const Settings = require('../models/Settings')
const bcrypt = require('bcrypt')
const generatePassword = require('../utils/generatePassword')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')

router.post('/', auth, roles, async (req, res) => {
  try {
    const { phone: login, name, roles } = req.body
    const candidate = await User.findOne({ login })
    const allRoles = await Role.find({}, { level: 1 })
    const roleLevels = []

    allRoles.forEach(role => {
      if (roles.includes(role._id.toString())) {
        roleLevels.push(role.level)
      }
    })

    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким логином существует' })
    }

    if (
      roleLevels.reduce((acc, level) => Math.min(acc, level), 1000) <=
      req.user.maxLevelOfRoles
    ) {
      return res.status(400).json({
        message:
          'Вы не можете добавить пользователя с ролью, равной или больше Вашей',
      })
    }

    const password = generatePassword(name)
    const hashedPassword = await bcrypt.hash(password, 10)
    const settings = new Settings({})

    await settings.save()

    const newUser = {
      login,
      password: hashedPassword,
      name,
      roles,
      settings: settings._id,
      createdAt: new Date(),
    }

    await new User(newUser).save()

    return res.json({
      data: { login, password },
      message: 'Пользователь создан успешно',
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/roles', auth, roles, async (req, res) => {
  try {
    let roles = await Role.find(
      {
        level: {
          $gt: req.user.maxLevelOfRoles,
        },
      },
      { _id: 1, label: 1 }
    )
    roles = roles.map(({ _id, label }) => ({ value: _id, label }))

    res.json({ roles })
  } catch (e) {}
})

router.post('/roles', auth, roles, async (req, res) => {
  try {
    const { label, level } = req.body

    const candidate = await Role.findOne({ label })

    if (candidate)
      return res.status(400).json({ message: 'Такая роль уже существует' })

    const role = new Role({
      label,
      level,
    })

    await role.save()

    res.json({ role: { value: role._id, label, level } })
  } catch (e) {}
})

module.exports = router
