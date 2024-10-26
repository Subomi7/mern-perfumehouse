"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.order = void 0;

var _orderModel = _interopRequireDefault(require("../model/orderModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// create order
var order = function order(req, res) {
  var _req$body, orderItems, totalPrice, _order;

  return regeneratorRuntime.async(function order$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.body.user = req.user.userId;
          _req$body = req.body, orderItems = _req$body.orderItems, totalPrice = _req$body.totalPrice;

          if (!(orderItems && orderItems.length === 0)) {
            _context.next = 5;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'no order created'
          });
          return _context.abrupt("return");

        case 5:
          if (!(!orderItems || !totalPrice)) {
            _context.next = 8;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'all fields are required to create an order'
          });
          return _context.abrupt("return");

        case 8:
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(_orderModel["default"].create(_objectSpread({}, req.body)));

        case 11:
          _order = _context.sent;
          res.status(201).json({
            success: true,
            message: 'order created',
            order: _order
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);
          console.log(_context.t0.message);
          res.status(500).json(_context.t0.message);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 15]]);
};

exports.order = order;