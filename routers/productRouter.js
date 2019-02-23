var express = require('express');
var router = express.Router();
const { productController } = require('../controllers');

router.get('/listproduct', productController.listproduct)
router.post('/addproduct', productController.addproduct)
router.put('/editproduct/:id', productController.editproduct)
router.post('/deleteproduct/:id', productController.deleteproduct)
router.get('/productdetail/:productId', productController.productdetail)
//router.post('/signin', authController.signin)

module.exports = router;
//router.post('/editproduct/:id', flightController.editproduct)