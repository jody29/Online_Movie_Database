const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/', (req, res) => {
    const selPop = req.query ? req.query.popular : 'all_time'
    const selRat = req.query ? req.query.top_rated : 'all_time'

    Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_TOKEN}&language=nl-NL&page=1&year=${selPop}`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIEDB_TOKEN}&language=nl-NL&page=1&year=${selRat}`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIEDB_TOKEN}&language=nl-NL&page=1`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIEDB_TOKEN}&language=nl-NL&page=1`)
        .then(response => response.json())
    ])
    .then(([popular, top_rated, upcoming, now_playing]) => {
        const results = [
            {tab: 'Popular', name:'popular', movies: popular.results, years: ['all_time', '1994', '1995', '1996'], selected: selPop},
            {tab: 'Top rated', name: 'top_rated', movies: top_rated.results, years: ['all_time', '1994', '1995', '1996'], selected: selRat},
            {tab: 'Upcoming', movies: upcoming.results},
            {tab: 'Now playing', movies: now_playing.results},
        ]

        res.render('pages/overview', {
            title: 'overview',
            results
        })
    })
})

module.exports = router