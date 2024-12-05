const cartModel = require("../models/cartModel")

const cartPriceCalculator = async (user)=>{
    let cartProducts = await cartModel.find({userId : user._id});
    let priceArray = []
    cartProducts.forEach((item)=>{
        priceArray.push(item.productsPrices);
    })
    let total = 0;
    for(let i = 0; i < priceArray.length; i++){
        total += priceArray[i];
    }
    user.totalCartPrice = total;
    await user.save();
}
module.exports = cartPriceCalculator