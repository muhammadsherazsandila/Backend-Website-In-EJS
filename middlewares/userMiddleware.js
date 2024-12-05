const jwt = require('jsonwebtoken');
require('dotenv').config();
const userAuthenticator = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        res.redirect("/loginRegister")
    }
    else {
        try {
            let data = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = data;
            next();
        } catch (error) {
            req.flash("error" , "Something Went Wrong!")
        }
    }
}

module.exports = userAuthenticator;;