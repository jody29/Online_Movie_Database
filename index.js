const express = require('express')
const app = express()
const path = require('path')

const PORT = 8000

// set templating engine
app.set('view engine', 'ejs')
// set views folder
app.set('views', path.join(__dirname, 'views'))
// use static files from public folder
app.use(express.static(__dirname + '/public'))

// import routers
const homeRoute = require('./routers/home')

// use routers
app.use('/', homeRoute)

app.use((req, res, next) => {
    res.status(404).render('pages/404', {
        title: 'ERROR404',
    })
})

// Express listens to port 8000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})