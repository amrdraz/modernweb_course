const app = require('./app');

// https://www.npmjs.com/package/dotenv
require('dotenv').config()

app.listen(process.env.PORT, _ => console.log(`server started on PORT ${process.env.PORT}`))
