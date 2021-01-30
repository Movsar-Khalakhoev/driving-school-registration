const { Router } = require('express')
const User = require('../models/User')
const { todayWithoutTime } = require('../utils/date')
const router = Router()

router.get('/', async (req, res) => {
  let students = await User.find(
    {
      roles: '600e5fb4c6bccf1e30ffa334',
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
})

router.post('/mark', async (req, res) => {
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
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
