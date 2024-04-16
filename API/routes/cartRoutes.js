const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/',verifyToken,cartController.getCartByEmail);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.deleteCart)
router.put('/:id', cartController.updateCart)
router.get('/:id', cartController.getSingleCart)

module.exports = router;