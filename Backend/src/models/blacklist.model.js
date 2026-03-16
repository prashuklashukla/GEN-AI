const mongoose = require('mongoose')



const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"]
    }
}, {
    timestamps: true
})

const TokenblacklistModels = mongoose.model("blacklist", blacklistSchema)

module.exports = TokenblacklistModels