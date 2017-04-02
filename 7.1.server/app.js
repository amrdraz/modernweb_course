// https://expressjs.com/en/starter/hello-world.html
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.send('Hello World you should probably try GET /api/todo-list !')
})

app.use(`/api/todo-list`, require('./routes/todo-list'))
app.use(`/api/todo-item`, require('./routes/todo-item'))

module.exports = app
