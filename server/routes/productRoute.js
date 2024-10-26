import express from 'express';
import {
  allProduct,
  createProduct,
  deleteProduct,
  insertMany,
  singleProduct,
  updateProduct,
} from '../controllers/productController.js';
const router = express.Router();

//  post request

router.post('/create', createProduct);
router.post('/create-many', insertMany)    // this is to enable posting of multiple data to the server
// get request
router.get('/products', allProduct);

// getting single product
router.get('/:productId', singleProduct);

// deleting product
router.delete('/:productId', deleteProduct);

// update product
router.patch('/:productId', updateProduct)

export default router;
