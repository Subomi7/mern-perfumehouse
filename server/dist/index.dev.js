"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("./db/db.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute.js"));

var _authRoute = _interopRequireDefault(require("./routes/authRoute.js"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute.js"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;

_dotenv["default"].config();

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/api/product', _productRoute["default"]);
app.use('/api/auth', _authRoute["default"]);
app.use('/api/order', _orderRoute["default"]);
app.get('/', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'server is live'
  });
});
app.use(function (req, res) {
  res.status(404).json({
    errMsg: 'route not found'
  });
});
(0, _db.connect)().then(function () {
  try {
    app.listen(port, function () {
      console.log("http://localhost:".concat(port));
    });
  } catch (error) {
    console.log('cannot connect to server' + error.message);
  }
})["catch"](function (error) {
  console.log('invalid database connection' + error.message);
});