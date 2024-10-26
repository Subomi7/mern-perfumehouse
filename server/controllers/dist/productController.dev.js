"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMany = exports.singleProduct = exports.deleteProduct = exports.updateProduct = exports.allProduct = exports.createProduct = void 0;

var _productModel = _interopRequireDefault(require("../model/productModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// C -- for create in CRUD
var createProduct = function createProduct(req, res) {
  var _req$body, title, image, rating, rateCount, price, discountPrice, product;

  return regeneratorRuntime.async(function createProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, image = _req$body.image, rating = _req$body.rating, rateCount = _req$body.rateCount, price = _req$body.price, discountPrice = _req$body.discountPrice;

          if (!title || !image || !rating || !rateCount || !price || !discountPrice) {
            res.status(400).json({
              success: false,
              errMsg: 'all fields are required'
            });
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_productModel["default"].create(req.body));

        case 5:
          product = _context.sent;
          res.status(200).json({
            success: true,
            message: 'product created successfully',
            product: product
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0.message);
          res.status(500).json(_context.t0.message);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}; //  R --- read in CRUD


exports.createProduct = createProduct;

var allProduct = function allProduct(req, res) {
  var product;
  return regeneratorRuntime.async(function allProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].find());

        case 3:
          product = _context2.sent;

          if (!(product && product.length === 0)) {
            _context2.next = 7;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'no products found / created'
          });
          return _context2.abrupt("return");

        case 7:
          res.status(200).json({
            success: true,
            message: 'products',
            product: product
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.status(500).json(_context2.t0.message);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // U --- for update in CRUD


exports.allProduct = allProduct;

var updateProduct = function updateProduct(req, res) {
  var productId, product;
  return regeneratorRuntime.async(function updateProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productId = req.params.productId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].findOneAndUpdate({
            _id: productId
          }, req.body, {
            "new": true,
            runValidators: true
          }));

        case 4:
          product = _context3.sent;
          res.status(200).json({
            success: true,
            message: 'product updated',
            product: product
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0.message);
          res.status(500).json(_context3.t0.message);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; // D --- for delete in crud


exports.updateProduct = updateProduct;

var deleteProduct = function deleteProduct(req, res) {
  var productId, product;
  return regeneratorRuntime.async(function deleteProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          productId = req.params.productId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].findOneAndDelete({
            _id: productId
          }));

        case 4:
          product = _context4.sent;
          res.status(200).json({
            success: true,
            errMsg: 'product deleted'
          });
          return _context4.abrupt("return");

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0.message);
          res.status(500).json(_context4.t0.message);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
}; // getting single product


exports.deleteProduct = deleteProduct;

var singleProduct = function singleProduct(req, res) {
  var productId, product;
  return regeneratorRuntime.async(function singleProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          productId = req.params.productId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].findOne({
            _id: productId
          }));

        case 4:
          product = _context5.sent;

          if (product) {
            _context5.next = 8;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'product not found'
          });
          return _context5.abrupt("return");

        case 8:
          res.status(200).json({
            success: true,
            message: 'product',
            product: product
          });
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0.message);
          res.status(500).json(_context5.t0.message);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 11]]);
}; // insert many products


exports.singleProduct = singleProduct;

var insertMany = function insertMany(req, res) {
  var product;
  return regeneratorRuntime.async(function insertMany$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].insertMany(req.body));

        case 3:
          product = _context6.sent;
          res.status(201).json({
            success: true,
            message: 'all product',
            product: product
          });
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
          res.status(500).json(_context6.t0.message);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.insertMany = insertMany;