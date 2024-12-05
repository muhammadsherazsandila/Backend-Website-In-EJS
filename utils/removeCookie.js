const removeCookie = ( req , res )=>{
    res.clearCookie("token")
    res.redirect("/loginRegister")
}
module.exports = removeCookie