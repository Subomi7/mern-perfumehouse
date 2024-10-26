"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator2 = _interopRequireDefault(require("validator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validator: function validator(value) {
      if (!_validator2["default"].isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'minimum password length is 8']
  }
}, {
  timestamps: true
}); // hashing password

customerSchema.pre('save', function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified('password')) {
            next();
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt());

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(this.password, salt));

        case 6:
          this.password = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // comparing hashpassword

customerSchema.methods.comparePassword = function _callee2(customerPassword) {
  var isCorrect;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(customerPassword, this.password));

        case 2:
          isCorrect = _context2.sent;
          return _context2.abrupt("return", isCorrect);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; // generating token


customerSchema.methods.generateToken = function _callee3(params) {
  var token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = _jsonwebtoken["default"].sign({
            userId: this._id,
            firstName: this.firstName,
            lastName: this.lastName
          }, process.env.JWT_SECRETE, {
            expiresIn: "24h"
          });
          return _context3.abrupt("return", token);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
};

var CUSTOMER = _mongoose["default"].model('customer', customerSchema);

var _default = CUSTOMER;
exports["default"] = _default;