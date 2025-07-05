const express = require('express');
const router = express.Router();

const ProductController = require('../Controller/ProductController.js');
const AuthMiddleware = require('../middleware/AuthMiddlware.js');
const upload = require('../Helpers/imageUpload.js');

router.post('/create',AuthMiddleware,upload.single("ProfileImage"),ProductController.CreateProduct);
router.get('/getAllOrders',AuthMiddleware, ProductController.GetAllProducts);
router.get('/gellSingleProduct/:id',AuthMiddleware, ProductController.GetSingleProduct);
// router.put('/update/:id',AuthMiddleware, ProductController.UpdateProduct);
router.patch('/order/:id' , AuthMiddleware ,ProductController.updateOrderFields)
router.delete('/delete/:id',AuthMiddleware, ProductController.DeleteProduct);

module.exports = router ;