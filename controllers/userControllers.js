const usersModel = require("../models/usersModel");
const bcrypt = require('bcrypt');
const generateCookie = require("../utils/generateCookie");
require("dotenv").config();
const createUser = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;
        let user = await usersModel.findOne({ email: email });
        if (user) {
            req.flash("error" , "Email or Password Incorrect!")
            res.redirect("/loginRegister")
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    let user = await usersModel.create({
                        fullName,
                        email,
                        password: hash,
                        totalCartPrice : 0
                    })
                    let token = generateCookie.generateCookieUser(user);
                    res.cookie("token" , token);
                    res.redirect("/logedInUser")
                })
            })
        }
    } catch (error) {
        req.flash("error" , "Email or Password Incorrect!")
        res.redirect("/loginRegister")
    }
}
const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await usersModel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = generateCookie.generateCookieUser(user);
                    res.cookie("token" , token)
                    res.redirect("/logedInUser")
                } else {
                    req.flash("error" , "Email or Password Incorrect!")
                    res.redirect("/loginRegister")
                }
            })
        } else {
            req.flash("error" , "Email or Password Incorrect!")
            res.redirect("/loginRegister")
        }
    } catch (error) {
        req.flash("error" , "Email or Password Incorrect!")
        res.redirect("/loginRegister")
    }
}

module.exports = {createUser , loginUser};