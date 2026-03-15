const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "this username is Already take"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "this email is Already take"]
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const userModels = mongoose.model("User", userSchema)

module.exports = userModels