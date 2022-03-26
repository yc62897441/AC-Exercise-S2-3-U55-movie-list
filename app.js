// require packages used in the project
const express = require("express")
const app = express()
const port = 3000

// load movieList json
const movieList = require("./movies.json")

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set("view engine", "handlebars")

// setting static files
app.use(express.static("public"))

// routes setting
app.get("/", (req, res) => {
  res.render("index", { movies: movieList.results })
  // 如果帶入的名稱相同可簡寫成 res.render("index", { movies })
})

// 用 params 打造各電影個別之路由
app.get("/movies/:movie_id", (req, res) => {
  const movie = movieList.results.find(item => item.id.toString() === req.params.movie_id)
  res.render("show", { movie: movie })
})

// 用 Query String 打造搜尋功能
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(function (movie) {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render("index", { movies: movies, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Movie List serve is listening on http://localhost:${port}`)
})



