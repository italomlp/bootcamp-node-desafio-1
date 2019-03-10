const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.get('/', (req, res) => res.render('home', { name: 'Italo' }))

app.listen(3000)
