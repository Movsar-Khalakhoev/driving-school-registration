const { Schema, model } = require('mongoose')

const FunctionalitySchema = new Schema({
  components: {
    type: Object,
    required: true,
    default: {},
  },
  links: [
    {
      regExp: String,
      link: String,
      method: {
        type: String,
      },
    },
  ],
})

module.exports = model('Functionality', FunctionalitySchema)
