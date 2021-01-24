const { Schema, model } = require('mongoose')

const intervalSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  practiceMode: {
    type: Schema.Types.ObjectId,
    ref: 'PracticeMode',
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = model('Interval', intervalSchema)
