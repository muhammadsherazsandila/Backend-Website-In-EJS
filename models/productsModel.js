const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    productName : String,
    productPrice : Number,
    panelColor : String,
    textColor : String,
    productPic : Buffer
})

module.exports = mongoose.model("product" , productsSchema);