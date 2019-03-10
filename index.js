const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const isAgeInformedMiddleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}

app.get('/', (req, res) => res.render('home', { name: 'Italo' }))

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age) {
    if (age < 18) {
      return res.redirect(`/minor?age=${age}`)
    }
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect('/')
})

app.get('/major', isAgeInformedMiddleware, (req, res) =>
  res.render('major', { age: req.query.age })
)

app.get('/minor', isAgeInformedMiddleware, (req, res) =>
  res.render('minor', { age: req.query.age })
)

app.listen(3000)
