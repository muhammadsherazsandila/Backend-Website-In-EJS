const jwt = require('jsonwebtoken');
require('dotenv').config();
const ownerAuthenticator = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        req.flash("error" , "First Login!")
        res.redirect("/ownerLogin")
    }
    else {
        try {
            let data = jwt.verify(token, process.env.TOKEN_KEY);
            req.owner = data;
            next();
        } catch (error) {
            req.flash("error" , "Something Went Wrong!")
            res.redirect("/ownerLogin")
        }
    }
}

module.exports = ownerAuthenticator;;