const { Schema, model } = require('mongoose')

const settingsSchema = new Schema({
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  //   unique: true,
  // },
  periodicSchedule: [
    {
      hour: {
        type: Number,
        required: true,
      },
      weekDay: {
        type: Number,
        required: true,
      },
    },
  ],
  currentSchedule: [
    {
      hour: {
        type: Number,
        required: true,
      },
      weekDay: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
    },
  ],
})

module.exports = model('Settings', settingsSchema)
