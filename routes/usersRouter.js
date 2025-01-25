const express = require("express")
const router = express.Router()
const { registerUser, loginUser, logout } = require("../controllers/authController")
const upload = require("../config/multer-config")
const isloggedin = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken")


router.get("/", function (req, res) {
    res.send("hey it's working");
});

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/logout", logout);


router.get("/create", isloggedin, function (req, res) {
    let success = req.flash("success")
    res.render("uploadFile", { success })
});

router.get("/profile", isloggedin, async function (req, res) {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    let user = await userModel.findOne({ email: decoded.email }).populate("uploads")
    uploaded = user.uploads
    let success = req.flash("success")
    res.render("profile", { user, uploaded,success })

})

router.get("/update", isloggedin, async function (req, res) {
    let success = req.flash("success")
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.email })
    res.render('update', { user, success })
})



router.post("/updated", upload.single("profile_img"), async function (req, res) {
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email })

        let { organization, role, skills, email, contact,batch,bio } = req.body;

        const updateData = { organization, role, skills, contact, batch,bio };

        if (req.file) {
            // user.profile_img = req.file.buffer;
            updateData.profile_img = req.file.buffer;
        }

        await userModel.findOneAndUpdate(
            { email: decoded.email },
            // { $set: {organization, role, skills, email, contact,batch } },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        req.flash("success", "Update successfull");
        res.redirect("/users/profile");
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send(err.message);
    }
});


module.exports = router;