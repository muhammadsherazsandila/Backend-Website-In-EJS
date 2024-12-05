const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateCookieUser = (user)=>{
    return jwt.sign({email : user.email , id : user._id} , process.env.TOKEN_KEY)
}

const generateCookieOwner = (owner)=>{
    return jwt.sign({email : owner.email , id : owner._id} , process.env.TOKEN_KEY)
}
module.exports = {generateCookieUser , generateCookieOwner};