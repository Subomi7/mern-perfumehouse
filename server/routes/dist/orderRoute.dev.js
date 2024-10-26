"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = require("../controllers/orderController.js");

var _auth = require("../middleware/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //post request


router.post("/create", _auth.auth, _orderController.order);
var _default = router;
exports["default"] = _default;