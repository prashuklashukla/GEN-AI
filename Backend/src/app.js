const express = require("express");
const app = express();


app.use(express.json());



/* require all the routes here*/
const authRoutes = require('./router/auth.routes')

/* useing all the routes here  */
app.use('/api/auth', authRoutes)


module.exports = app;