const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    profile_img: Buffer,
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    enrollment_no:Number,
    bio: String,
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "file",
    }],
    uploads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "file",
        // ref: "files",
    }],
    contact: Number,
    organization: String,
    role: String,
    skills:String,
    batch:String,
    
})

module.exports = mongoose.model("user", userSchema)