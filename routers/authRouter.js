var express = require('express');
var router = express.Router();
const { authController } = require('../controllers');

router.post('/register', authController.register)
router.post('/verified', authController.verified)
router.post('/signin', authController.signin)
router.post('/admsignin', authController.admsignin)
router.post('/keepsignin', authController.keepsignin)
router.post('/admkeepsignin', authController.admkeepsignin)
module.exports = router;