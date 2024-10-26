"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var orderSchema = new Schema({
  orderItems: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    }
  }],
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'customer',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    "default": 0.0
  }
}, {
  timestamps: true
});

var ORDER = _mongoose["default"].model('order', orderSchema);

var _default = ORDER;
exports["default"] = _default;