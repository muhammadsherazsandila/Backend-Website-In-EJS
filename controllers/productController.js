const { text } = require("express");
const ownerModel = require("../models/ownerModel");
const productsModel = require("../models/productsModel");
const usersModel = require("../models/usersModel");
const cartModel = require("../models/cartModel");
const cartPriceCalculator = require("../utils/cartPriceCalculator");

const createProduct = async (req, res) => {
    let { productName, productPrice, textColor, panelColor } = req.body;
    let isProduct = await productsModel.findOne({ productName: productName });
    if (isProduct === null) {
        let product = await productsModel.create({
            productName,
            productPrice,
            textColor,
            panelColor
        })
        product.productPic = req.file.buffer;
        await product.save();
        let id = req.owner.id;
        let owner = await ownerModel.findOne({ _id: id });
        owner.products.push(product._id);
        await owner.save();
        req.flash("error", "Product Created Successfully!")
        res.redirect("/adminPannel");
    }
    else {
        req.flash("error", "Product Name Exist.")
        res.redirect("/adminPannel")
    }
}
const deleteProduct = async (req, res) => {
    let id = req.owner.id;
    let owner = await ownerModel.findOne({ _id: id });
    let productId = req.params.productId;
    let index = owner.products.indexOf(productId);
    owner.products.splice(index, 1)
    await owner.save();
    await productsModel.deleteOne({ _id: productId });
    res.redirect("/adminPannel")
}
const editProduct = async (req, res) => {
    let { productName, price, panelColor, textColor, productImage } = req.body;
    let productId = req.params.productId;
    let product = await productsModel.findOne({ _id: productId });
    product.productName = productName;
    product.price = price;
    product.panelColor = panelColor;
    product.textColor = textColor;
    product.productPic = req.file.buffer
    await product.save();
    res.redirect("/adminPannel")
}
const addToCart = async (req, res) => {
    let productId = req.params.productId;
    let user = await usersModel.findOne({ _id: req.user.id });
    if (user.cart.includes(productId)) {
        req.flash("error", "Product Already Added To Cart!")
    }
    else{
        let product = await productsModel.findOne({ _id: productId });
        await cartModel.create({
            productPrice: product.productPrice,
            productName: product.productName,
            productPic: product.productPic,
            userId: user._id,
            numberOfProducts: 1,
            productsPrices: product.productPrice
        })
        user.cart.push(product._id)
        cartPriceCalculator(user)
        req.flash("error", "Added To Cart!")
    }
    res.redirect("/logedInUser")

}
const removeProduct = async (req, res) => {
    let user = await usersModel.findOne({_id : req.user.id});
    let cartProduct = await cartModel.findOne({_id : req.params.productId});
    let product = await productsModel.findOne({productName : cartProduct.productName});
    let index = user.cart.indexOf(product);
    user.cart.splice(index , 1);
    await cartModel.deleteOne({ _id: cartProduct._id })
    cartPriceCalculator(user)
    res.redirect("/cart")
}
const addNo = async (req, res) => {
    let user = await usersModel.findOne({ _id: req.user.id });
    let productId = req.params.productId;
    let product = await cartModel.findOne({ _id: productId })
    product.numberOfProducts += 1;
    product.productsPrices += product.productPrice;
    user.totalCartPrice += product.productsPrices;
    await product.save();
    cartPriceCalculator(user)
    res.redirect("/cart")
}
const minimizeNo = async (req, res) => {
    let user = await usersModel.findOne({ _id: req.user.id });
    let productId = req.params.productId;
    let product = await cartModel.findOne({ _id: productId })
    product.numberOfProducts -= 1;
    if (product.numberOfProducts === 0) {
        product.numberOfProducts = 1;
        await product.save();
    } else {
        product.productsPrices -= product.productPrice;
        user.totalCartPrice -= product.productsPrices;
        await product.save();
        await user.save();
        cartPriceCalculator(user)
    }
    res.redirect("/cart")
}

module.exports = { createProduct, deleteProduct, editProduct, addToCart, removeProduct, addNo, minimizeNo };