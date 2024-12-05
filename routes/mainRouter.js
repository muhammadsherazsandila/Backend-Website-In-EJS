const express = require('express');
const mainRouter = express.Router();
const ownerAuthenticator = require('../middlewares/ownerMiddleware')
const ownerModel = require("../models/ownerModel");
const productsModel = require('../models/productsModel');
const userAuthenticator = require('../middlewares/userMiddleware');
const usersModel = require('../models/usersModel');
const removeCookie = require('../utils/removeCookie');
const cartModel = require('../models/cartModel');
mainRouter.get("/" , async ( req , res )=>{
    let products = await productsModel.find();
    res.render("home" , {products})
})

mainRouter.get("/logedInUser" , userAuthenticator, async ( req , res )=>{
    let id = req.user.id;
    let user = await usersModel.findOne({_id : id});
    const owner = await ownerModel.findOne({email : "msd.sheraz046@gmail.com"}).populate("products")
    let error = req.flash("error");
    res.render("logedInUser" , {user , owner , error})
})

mainRouter.get("/loginRegister" , ( req , res )=>{
    let error = req.flash("error")
    res.render("loginRegister" , {error})
})

mainRouter.get("/ownerLogin" , ( req , res )=>{
    let error = req.flash("error")
    res.render("ownerLogin" , {error})
})

mainRouter.get("/adminPannel" , ownerAuthenticator, async ( req , res )=>{
    let id = req.owner.id;
    let owner = await ownerModel.findOne({_id : id }).populate('products')
    let error = req.flash("error")
    res.render("admin" , {owner , error})
})

mainRouter.get("/editProduct/:productId" , ownerAuthenticator , async ( req , res )=>{
    let id = req.owner.id;
    let owner = await ownerModel.findOne({_id : id});
    let productId = req.params.productId;
    let product = await productsModel.findOne({_id : productId});
    res.render("editProducts" , {owner , product});
})

mainRouter.get("/cart" , userAuthenticator , async ( req , res )=>{
    let id = req.user.id;
    let user = await usersModel.findOne({_id : id})
    let cartArray = await cartModel.find({userId : id})
    res.render("cart" , {cartArray , user})
})


mainRouter.get("/logout" , userAuthenticator , removeCookie)
module.exports = mainRouter;