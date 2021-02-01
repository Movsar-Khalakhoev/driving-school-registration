const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Interval = require('../models/Interval')
const Functionality = require('../models/Functionality.model')
const Role = require('../models/Role')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/roles.middleware')
const { toggleInterval } = require('../utils/settings.auxiliary')

router.get('/:userId/schedule/periodic', auth, roles, async (req, res) => {
  const { settings } = await User.findOne(
    { _id: req.params.userId },
    { settings: 1 }
  ).populate('settings')

  res.json({ schedule: settings.periodicSchedule })
})

router.get(
  '/:userId/schedule/current/:interval',
  auth,
  roles,
  async (req, res) => {
    try {
      const { settings } = await User.findOne(
        { _id: req.params.userId },
        { settings: 1 }
      ).populate('settings')

      const [start, end] = req.params.interval.split('-')
      let rentedIntervals = await Interval.find(
        {
          timestamp: {
            // $gte: new Date() > new Date(+start) ? new Date() : new Date(+start)
            $gte: new Date(+start),
            $lte: new Date(+end),
          },
          instructor: req.params.userId,
        },
        { timestamp: 1, name: 1 }
      ).populate('practiceMode')

      rentedIntervals = rentedIntervals.map(interval => ({
        name: interval.name,
        hour: new Date(interval.timestamp).getHours(),
        weekDay: new Date(interval.timestamp).getDay() || 7,
        practiceMode: interval.practiceMode.label,
        disabled: true,
      }))

      const intervalTemplate = (item, isDisabled) => ({
        id: item._id,
        hour: item.hour,
        weekDay: item.weekDay,
        disabled: isDisabled,
      })

      settings.periodicSchedule.forEach(item => {
        if (
          !rentedIntervals.find(
            interval =>
              interval.hour === item.hour && interval.weekDay === item.weekDay
          )
        ) {
          rentedIntervals.push(intervalTemplate(item, true))
        }
      })

      settings.currentSchedule.forEach(interval => {
        if (
          new Date(interval.timestamp) > new Date(+start) &&
          new Date(interval.timestamp) < new Date(+end)
        ) {
          rentedIntervals.push(intervalTemplate(interval, false))
        }
      })

      res.json({ schedule: rentedIntervals })
    } catch (e) {}
  }
)

router.post('/schedule/periodic', auth, roles, async (req, res) => {
  try {
    const instructor = await User.findOne(
      { _id: req.user.userId },
      { settings: 1 }
    ).populate('settings')
    const { settings } = instructor

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.periodicSchedule, item)

      if (filtered) {
        return (settings.periodicSchedule = filtered)
      }

      settings.periodicSchedule.push(item)
    })

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.currentSchedule, item)

      if (filtered) {
        return (settings.currentSchedule = filtered)
      }
    })

    await settings.save()

    return res.json({
      schedule: settings.periodicSchedule,
      message: 'Настройки успешно сохранены!',
    })
  } catch (e) {}
})

router.post('/schedule/current', auth, roles, async (req, res) => {
  try {
    const instructor = await User.findOne(
      { _id: req.user.userId },
      { settings: 1 }
    ).populate('settings')
    const { settings } = instructor

    req.body.changed.forEach(item => {
      const filtered = toggleInterval(settings.currentSchedule, item)

      if (filtered) {
        return (settings.currentSchedule = filtered)
      }

      settings.currentSchedule.push(item)
    })

    await settings.save()

    res.json({ message: 'Настройки успешно сохранены!' })
  } catch (e) {}
})

router.post('/functionality/add-functionality', async (req, res) => {
  try {
    const { functionality } = req.body
    const candidate = await Functionality.findOne({
      [`components.${Object.keys(functionality.components)[0]}`]: true,
    })

    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Такая функциональность уже существует!' })
    }

    await new Functionality(functionality).save()

    return res.json({ message: 'Фукциональность зарегистрирована!' })
  } catch (e) {
    console.log(e)
  }
})

router.get(
  '/functionality/all-functionalities',
  auth,
  roles,
  async (req, res) => {
    try {
      const functionalities = await Functionality.find(
        {},
        { _id: 1, components: 1, links: 1 }
      )

      res.json({ functionalities })
    } catch (e) {
      console.log(e)
    }
  }
)

router.post('/functionality/change-functionalities', async (req, res) => {
  try {
    const { changes } = req.body
    const allRoles = await Role.find({})

    for (const role of allRoles) {
      const roleChanges = changes.reduce(
        (acc, change) =>
          change.roleId === role._id.toString() ? [...acc, change] : acc,
        []
      )

      if (!roleChanges.length) {
        continue
      }

      roleChanges.forEach(change => {
        const permissionIndex = role.permissions.findIndex(
          permission => permission.toString() === change.functionalityId
        )

        if (permissionIndex === -1) {
          role.permissions.push(change.functionalityId)
        } else {
          role.permissions = [
            ...role.permissions.slice(0, permissionIndex),
            ...role.permissions.slice(permissionIndex + 1),
          ]
        }
      })

      await role.save()
    }

    res.json({})
  } catch (e) {}
})

module.exports = router