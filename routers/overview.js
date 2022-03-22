const { response } = require('express')
const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/overview', async (req, res) => {

    Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=1`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=1`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=1`)
        .then(response => response.json())
    ])
    .then(([popular, top_rated, latest]) => {
        const results = [
            {tab: 'popular', movies: popular.results},
            {tab: 'top rated', movies: top_rated.results},
            {tab: 'latest', movies: latest.results},
        ]

        console.log(results[0].movies.length)

        res.render('pages/overview', {
            title: 'overview',
            results
        })
    })
})

// router.get('/overview', async (req, res) => {
//     const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=1`
//     const options = {
//         'method': 'GET'
//     }

//     const response = await fetch(url, options)
//     .then(result => result.json() )
//     .catch(e => {
//         console.error({
//             'message': 'error',
//             error: e
//         })
//     })

//     const movieData = response.results

//     res.render('pages/overview', {
//         title: 'overview',
//         movieData
//     })
// })

module.exports = router