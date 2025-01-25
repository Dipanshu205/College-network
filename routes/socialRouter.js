const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const socialModel = require("../models/social-model")

router.post("/create", upload.single("image"), async function (req, res) {
    // res.send(req.file)
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        let post = await socialModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        })

        req.flash("success", "Post created successfully")
        res.redirect("/social")
    } catch (err) {
        res.send(err.message);
    }
});



module.exports = router;