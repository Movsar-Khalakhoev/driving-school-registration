const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', require('./routes/Auth.routes'))
app.use('/api/schedule', require('./routes/Schedule.routes'))
app.use('/api/users', require('./routes/Users.routes'))
app.use('/api/add-user', require('./routes/AddUser.routes'))
app.use('/api/settings', require('./routes/Settings.routes'))
app.use('/api/variables', require('./routes/Variables.routes'))
app.use('/api/attendance', require('./routes/Attendance.routes'))
app.use('/api/general', require('./routes/GENERAL.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

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
