"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController.js");

var _auth = require("../middleware/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // post request


router.post('/signup', _authController.signUp); //post request for sign in

router.post('/signin', _authController.signIn); //verify

router.get("/verify", _auth.auth, _authController.verify);
var _default = router;
exports["default"] = _default;