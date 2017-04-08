const socket = require('socket.io');
const events = require('./events')

module.exports = http => {
  const io = socket(http)
  events(io)
  return io
}
