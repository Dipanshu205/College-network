const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken")


module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;      //joey package to read

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "you already have an account, please login.")
            return res.redirect("/")
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return req.flash(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user)
                    res.cookie("token", token)
                    req.flash("success", "user registered successfully")
                    res.redirect("/")

                }
            })
        })

    } catch (err) {
        req.flash(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email }).select("-profile_img")
    if (!user) {
        req.flash("error", "Email or Password incorrect")
        return res.redirect("/")
    }

    bcrypt.compare(password, user.password, function (err, result) {
        // res.send(result)
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token);
            // res.send("login success")
            res.redirect("/home")
        } else {
            req.flash("error", "Email or Password incorrect")
            return res.redirect("/")
        }
    })
}

module.exports.logout = function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}