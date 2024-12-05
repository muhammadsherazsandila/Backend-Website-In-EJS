const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    profilePic : {
        type : Buffer,
        default : "../public/images/defaultprofile.jpeg"
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }],
})

module.exports = mongoose.model("owner" , ownerSchema);