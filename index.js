const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

app.use(express.json())

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/schedule', require('./routes/schedule.route'))
app.use('/api/users', require('./routes/user.route'))
app.use('/api/add-user', require('./routes/addUser.route'))
app.use('/api/settings', require('./routes/settings.route'))
app.use('/api/variables', require('./routes/variables.route'))

async function start() {
  await mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

start().then(() =>
  app.listen(config.PORT, () =>
    console.log(`STARTED AT PORT ${config.PORT}...`)
  )
)
