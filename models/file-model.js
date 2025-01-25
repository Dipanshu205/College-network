const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    pdf: Buffer,
    name: String,
    url: String,
    description:String,
    department: String,
    user: String,
    role: String,
    date: Date,
})

module.exports = mongoose.model("file", fileSchema)