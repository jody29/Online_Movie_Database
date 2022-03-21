const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

// use bodyParser so I can receive the body of a filled in form
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// get index page
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Healthy Check'
    })
})

// post request when user submits form
router.post('/search', async (req, res) => {
    const query = req.body.productSearch

    const url = `https://world.openfoodfacts.org/api/2/products/${query}.json`
    const options = {
        'method': 'GET'
    }

    const response = await fetch(url, options)
    .then(res => res.json())
    .catch(e => {
        console.error({
            'message': 'oh no',
            error: e,
        })
    })
    
    res.render('pages/detail', {
        title: query,
        data: response.product
    })
})

module.exports = router