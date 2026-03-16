const express = require("express");
const app = express();
const cookieparser = require("cookie-parser")


app.use(express.json());
app.use(cookieparser())



/* require all the routes here*/
const authRoutes = require('./router/auth.routes')

/* useing all the routes here  */
app.use('/api/auth', authRoutes)


module.exports = app;