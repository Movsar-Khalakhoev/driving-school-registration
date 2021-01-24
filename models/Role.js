const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = model('Role', roleSchema)
