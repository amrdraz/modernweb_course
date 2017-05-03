// https://expressjs.com/en/starter/hello-world.html
const express = require('express');
// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser');
// Google npm cors :P
const cors = require('cors');

const app = express()

// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.send('Hello World you should probably try GET /api/todo-list !')
})

app.use(`/api/todo-list`, require('./routes/todo-list'))
app.use(`/api/todo-item`, require('./routes/todo-item'))

module.exports = app
