const express = require('express');
const router = express.Router();
const controller = require("../controllers/ownerController");
const uploadFiles = require('../utils/uploadProfilePic');
const ownerAuthenticator = require('../middlewares/ownerMiddleware');
require('dotenv').config(); // To load all Variables in .evn file......

if (process.env.NODE_ENV === "development") {
    router.post("/createOwner", controller.ownerRegister)
}

router.post("/login" , controller.ownerLogin)

router.post('/upload/profilePic' , uploadFiles.upload.single('image') , ownerAuthenticator , controller.ownerProfilePic)



module.exports = router; // Ensure you're exporting the router
