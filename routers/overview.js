const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/', async (req, res) => {
    
    req.session.popular = req.query.popular ? req.query.popular : req.session.popular
    req.session.top_rated = req.query.top_rated ? req.query.top_rated : req.session.top_rated

    const selPop = req.session.popular
    const selRat = req.session.top_rated

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
            {tab: 'Popular', name:'popular', movies: popular.results, years: ['now', '1994', '1995', '1996'], selected: selPop},
            {tab: 'Top rated', name: 'top_rated', movies: top_rated.results, years: ['now', '1994', '1995', '1996'], selected: selRat},
            {tab: 'Upcoming', movies: upcoming.results},
            {tab: 'Now playing', movies: now_playing.results},
        ]

        res.render('pages/overview', {
            title: 'overview',
            results
        })
    })
})

router.get('/movies/:id', (req, res) => {
    Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US`)
        .then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US`)
        .then(response => response.json())
    ])
    .then(([details, similar]) => {
        const same = similar.results

        res.render('pages/detail', {
            title: details.original_title,
            details,
            same
        })
    })
})

module.exports = router