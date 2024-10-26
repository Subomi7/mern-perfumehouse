"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = require("../controllers/productController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //  post request


router.post('/create', _productController.createProduct);
router.post('/create-many', _productController.insertMany); // this is to enable posting of multiple data to the server
// get request

router.get('/products', _productController.allProduct); // getting single product

router.get('/:productId', _productController.singleProduct); // deleting product

router["delete"]('/:productId', _productController.deleteProduct); // update product

router.patch('/:productId', _productController.updateProduct);
var _default = router;
exports["default"] = _default;