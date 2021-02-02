const { Router } = require('express')
const User = require('../models/User')
const { todayWithoutTime } = require('../utils/date')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')
const Joi = require('joi')
const validateRequest = require('../middlewares/validate-request.middleware')
const router = Router()

router.get('/', auth, roles, getAttendance)
router.post('/mark', auth, setUserAttendanceSchema, roles, setUserAttendance)

async function getAttendance(req, res) {
  let students = await User.find(
    {
      roles: '6016ccad404e3f42dce06682',
    },
    {
      _id: 1,
      name: 1,
      isAttend: 1,
    }
  )

  students = students.map(student => {
    const isAttend =
      student.isAttend.find(
        item =>
          new Date(item.timestamp).toISOString() ===
          todayWithoutTime().toISOString()
      ) || {}

    return {
      id: student._id,
      name: student.name,
      isAttend:
        isAttend.isAttend || isAttend.isAttend === false
          ? isAttend.isAttend
          : null,
    }
  })

  res.json({ students })
}

async function setUserAttendance(req, res) {
  try {
    const { id, isAttend } = req.body
    const student = await User.findById(id, { isAttend: 1 })
    const timestamp = todayWithoutTime().toISOString()

    const attendIndex = student.isAttend.findIndex(
      item => item.timestamp.toISOString() === timestamp
    )

    if (attendIndex !== -1) {
      student.isAttend = [
        ...student.isAttend.slice(0, attendIndex),
        ...student.isAttend.slice(attendIndex + 1),
      ]
    } else {
      student.isAttend.push({ timestamp, isAttend })
    }

    await student.save()

    res.json({})
  } catch (e) {}
}
function setUserAttendanceSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
    isAttend: Joi.allow(null).allow(Joi.boolean()).required(),
  })

  validateRequest(req, res, next, schema)
}

module.exports = router
