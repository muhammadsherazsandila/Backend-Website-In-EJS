const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }],
    totalCartPrice : Number,
    userPic : String
})

module.exports = mongoose.model("user" , usersSchema);