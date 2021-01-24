const {Schema, model} = require('mongoose')

const practiceModeSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  intervals: {
    type: Schema.Types.ObjectId,
    ref: 'Interval'
  }
})

module.exports = model('PracticeMode', practiceModeSchema)
