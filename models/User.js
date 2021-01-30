const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  ],
  settings: {
    type: Schema.Types.ObjectId,
    ref: 'Settings',
  },
  isAttend: [
    {
      timestamp: Date,
      isAttend: Boolean,
    },
  ],
  image: {
    type: String,
    default: 'https://clck.ru/SgH52',
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

module.exports = model('User', userSchema)
