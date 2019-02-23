var express = require('express');
var router = express.Router();
const { transaksiController } = require('../controllers');

router.post('/cart', transaksiController.cart)
router.get('/daftarcart/:username', transaksiController.daftarcart)
router.post('/datatransaksi', transaksiController.datatransaksi)
router.post('/transaksiitem', transaksiController.transaksiitem)
router.delete('/hapusdaftarcart/:id', transaksiController.hapusdaftarcart)

// router.post('/addproduct', productController.addproduct)
// router.put('/editproduct/:id', productController.editproduct)
// router.post('/deleteproduct/:id', productController.deleteproduct)
// router.get('/productdetail/:productId', productController.productdetail)
//router.post('/signin', authController.signin)

module.exports = router;
//router.post('/editproduct/:id', flightController.editproduct)