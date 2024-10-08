const express = require('express');
const router = express.Router();
const  productController = require('../controllers/productController');

router.post('',  productController.addProduct);
router.get('',  productController.getProducts);
router.get('/:id',  productController.getProductById);
router.put('/:id',  productController.modifyProduct)
router.delete('/:id',  productController.deleteProduct);

module.exports = router;