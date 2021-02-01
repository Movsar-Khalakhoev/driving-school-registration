const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Functionality',
    },
  ],
})

module.exports = model('Role', roleSchema)
