const express = require('express')
const authController = require('../controllers/auth.controller')

const authRoutes = express.Router()


/** 
*@routes Post api/auth/restures
* @description Register a new user  
* @access Public
**/

authRoutes.post("/register", authController.registerUser)

/**
 *@routes Post api/auth/login
* @description login the  user  
* @access Public
 */

authRoutes.post("/login", authController.loginUserController)

/**
 *@routes Post api/auth/logout
* @description logout the  user  
* @access Public
 */

authRoutes.get("/logout", authController.logoutUserController)


module.exports = authRoutes