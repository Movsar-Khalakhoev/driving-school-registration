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

    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким логином существует' })
    }

    const password = generatePassword(name)
    const hashedPassword = await bcrypt.hash(password, 10)
    const settings = new Settings({})

    await settings.save()

    const user = new User({
      login,
      password: hashedPassword,
      name,
      roles,
      settings: settings._id,
      createdAt: new Date(),
    })

    await user.save()

    return res.json({
      data: { login, password },
      message: 'Пользователь создан успешно',
    })
  } catch (e) {}
})

router.get('/roles', auth, roles, async (req, res) => {
  try {
    let roles = await Role.find({}, { _id: 1, label: 1 })
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
