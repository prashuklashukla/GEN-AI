const userModels = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @desc Register a new user, expect username, email, password in body
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModels.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModels.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.jwt_secret,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */

const loginUserController = async (req, res) => {
    const { email, password } = req.body

    const user = await userModels.findOne({ email })

    if (!user) {
        res.status(404).json({
            message: "invlaid email and password"
        })
    }

    const ispasswordvalaid = await bcrypt.compare(password, user.password)

    if (!ispasswordvalaid) {
        res.status(404).json({
            message: "invlaid password and email"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.jwt_secret,
        { expiresIn: "1d" }
    )

    res.cookie('token', token)

    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports = {
    registerUser,
    loginUserController
}