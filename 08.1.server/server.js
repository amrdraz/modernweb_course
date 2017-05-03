// https://www.npmjs.com/package/dotenv
require('dotenv').config()


const app = require('./app');

const http = require('http').Server(app);

const io = require('./io.js')(http);



http.listen(process.env.PORT, _ => console.log(`server started on PORT ${process.env.PORT}`))
