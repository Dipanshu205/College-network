const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    bgcolor: String,
    pannelcolor: String,
    textcolor: String
})

module.exports = mongoose.model("social", postSchema)