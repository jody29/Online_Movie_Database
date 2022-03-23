const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
require('dotenv').config()

const PORT = 8000

// set templating engine
app.set('view engine', 'ejs')
// set views folder
app.set('views', path.join(__dirname, 'views'))
// use static files from public folder
app.use(express.static(__dirname + '/public'))

// initialize session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)

// import routers
const overviewRoute = require('./routers/overview')

// use routers
app.use('/', overviewRoute)

app.use((req, res) => {
    res.status(404).render('pages/404', {
        title: 'ERROR404',
    })
})

// Express listens to port 8000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})