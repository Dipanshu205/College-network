const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const fileModel = require("../models/file-model")
const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken");
       
router.post("/create", upload.single("pdf"), async function (req, res) {

    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)       //

    let user = await userModel.findOne({ email: decoded.email })
        
    try {
        let { name, url, description, department } = req.body;
        let file = await fileModel.create({
            pdf: req.file.buffer,
            name,
            url,
            description,
            department,
            user: user.fullname,
            role: user.role,
            date: Date.now(),
        })

        req.flash("success", "File created successfully")
        user.uploads.push(file._id)
        await user.save()
        res.redirect("/library")
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;