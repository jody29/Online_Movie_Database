const express = require('express')
const router = express.Router()

// get index page
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Healthy Check'
    })
})

module.exports = router