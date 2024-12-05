const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const generateCookie = require("../utils/generateCookie");
const uploadFiles = require('../utils/uploadProfilePic')
const ownerRegister = async (req, res) => {
    try {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            req.flash("error" , "NOT ALLOWED MANY OWNERS!");
            res.redirect("/ownerLogin")
        }
        else {
            let { fullName, email, password } = req.body;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    let owner = await ownerModel.create({
                        fullName,
                        email,
                        password: hash
                    })
                    let token = generateCookie.generateCookieOwner(owner);
                    res.cookie("token", token);
                    res.redirect("/adminPannel")
                })
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const ownerLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({email : email});
        if (!owner) {
            req.flash("error" , "First Register!");
            res.redirect("/ownerLogin")
        }
        else {
            bcrypt.compare(password , owner.password , function(err , result){
                if(result){
                    let token = generateCookie.generateCookieOwner(owner)
                    res.cookie("token", token);
                    res.redirect("/adminPannel")
                }else{
                    req.flash("error" , "Something Went Wrong!")
                    res.redirect("/ownerLogin")
                }
            })
        }
    } catch (error) {
        req.flash("error" , "Something Went Wrong!")
        res.redirect("/ownerLogin")
    }

}
const ownerProfilePic =  async ( req , res ) =>{
    let id = req.owner.id;
    let owner = await ownerModel.findOne({_id : id});
    owner.profilePic = req.file.buffer;
    await owner.save();
    res.redirect("/adminPannel")
}
module.exports = {ownerRegister , ownerLogin ,ownerProfilePic}