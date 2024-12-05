const mongoose = require('mongoose');

const cartShema = mongoose.Schema({
    productName : String,
    productPrice : Number,
    numberOfProducts : Number,
    productsPrices : Number,
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    productPic : Buffer
})

module.exports = mongoose.model("cart" , cartShema);