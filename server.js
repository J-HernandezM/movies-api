const express = require('express')
const cors = require('cors')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movieSchema')

const app = express()
// Serve static files like css and js
app.use(express.static('public'))
// Allow CORS in * origins
app.use(cors())
// Read the chunks of a POST request
app.use(express.json())
// Serve the index.html as the main resource
app.get('/', (req, res) => { 
    res.sendFile( __dirname + '/index.html')
})
// Get all movies or filtered if genre query is passed by
app.get('/movies', (req, res)=>{
    const { genre } = req.query
    let filteredMovies
    if(genre){
        filteredMovies = movies.map( (movie) => {
            const match = movie.genre.some( g => g.toLowerCase() === genre.toLowerCase())
            if(match) {return movie}
        }).filter((movie) => movie !==undefined)
        res.json(filteredMovies)
    }else{
        res.json(movies)
    }

})
// Get a specific movie by ID
app.get('/movies/id/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex( movie => movie.id === id)
    res.json(movies[movieIndex])
})
// Get a specific movie by TITLE
app.get('/movies/title/:title', (req, res) => {
    const { title } = req.params
    const foundMovies = movies.map( (movie) => {
        if(movie.title.toLowerCase().includes(title.toLowerCase())){
            return movie
        }
    }).filter((movie) => movie !==undefined)
    res.json(foundMovies)
})
// Post a movie
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)
    if(!result.success){return res.status(400).json({error: JSON.parse(result.error.message)})}
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.unshift(newMovie)
    res.status(201).json(newMovie)
})
// Patch a movie
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    if(!result.success){return res.status(400).json({error: JSON.parse(result.error.message)})}

    const { id } = req.params
    const movieIndex = movies.findIndex( movie => movie.id === id)
    const modifiedMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = modifiedMovie
    res.json(modifiedMovie)
})
// Delete a movie
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex( movie => movie.id === id)
    const title = movies[movieIndex].title

    movies.splice(movieIndex, 1)
    res.json({message: `The movie: ${title} has been deleted`})
})

const PORT = process.env.PORT ?? 4545

app.listen(PORT, ()=>{
    console.log(`Listening to http://localhost:${PORT}`)
})