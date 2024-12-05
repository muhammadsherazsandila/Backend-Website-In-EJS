const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const ownerAuthenticator = require("../middlewares/ownerMiddleware")
const userAuthenticator = require('../middlewares/userMiddleware');
const productsPicUpload = require("../utils/productsPicUpload")

router.post("/createProduct" , ownerAuthenticator , productsPicUpload.upload.single("productImage") ,  productController.createProduct)
router.get("/deleteProduct/:productId" , ownerAuthenticator , productController.deleteProduct);
router.post("/editProduct/:productId" , ownerAuthenticator , productsPicUpload.upload.single("productImage") , productController.editProduct);
router.get("/addToCart/:productId" , userAuthenticator , productController.addToCart);
router.get("/removeProduct/:productId" , userAuthenticator , productController.removeProduct);
router.get("/addNo/:productId" , userAuthenticator , productController.addNo);
router.get("/minimizeNo/:productId" , userAuthenticator , productController.minimizeNo);
module.exports = router;
