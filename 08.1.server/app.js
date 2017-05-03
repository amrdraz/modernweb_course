// https://expressjs.com/en/starter/hello-world.html
const express = require('express');
// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser');
// Google npm cors :P
const cors = require('cors');

const app = express()

// const http = require('http').Server(app);
//
// const io = require('socket.io')(http);

// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('./public'))

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.send('Hello World you should probably try GET /api/todo-list !')
})

require('./routes')(app)

// require('./events')(io)

module.exports = app
// {
//   io,
//   app,
//   http
// }
