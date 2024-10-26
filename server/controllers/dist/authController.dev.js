"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.signIn = exports.signUp = void 0;

var _customerModel = _interopRequireDefault(require("../model/customerModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//sign up
var signUp = function signUp(req, res) {
  var _req$body, firstName, lastName, password, email, confirmPassword, existingEmail, customer;

  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, password = _req$body.password, email = _req$body.email, confirmPassword = _req$body.confirmPassword;

          if (!(!firstName || !lastName || !email || !password || !confirmPassword)) {
            _context.next = 4;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'all fields are required'
          });
          return _context.abrupt("return");

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(_customerModel["default"].findOne({
            email: email
          }));

        case 7:
          existingEmail = _context.sent;

          if (!existingEmail) {
            _context.next = 11;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'Email already in use'
          });
          return _context.abrupt("return");

        case 11:
          if (!(password !== confirmPassword)) {
            _context.next = 14;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'password and confirm password must match'
          });
          return _context.abrupt("return");

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(_customerModel["default"].create(_objectSpread({}, req.body)));

        case 16:
          customer = _context.sent;
          res.status(201).json({
            success: true,
            message: 'registered successfully',
            customer: customer
          });
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](4);
          res.status(500).json(_context.t0.message);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 20]]);
}; // sign in


exports.signUp = signUp;

var signIn = function signIn(req, res) {
  var _req$body2, email, password, user, isMatched, token;

  return regeneratorRuntime.async(function signIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'all fields are required'
          });
          return _context2.abrupt("return");

        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_customerModel["default"].findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 11;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'user not found'
          });
          return _context2.abrupt("return");

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 13:
          isMatched = _context2.sent;

          if (isMatched) {
            _context2.next = 17;
            break;
          }

          res.status(400).json({
            success: false,
            errMsg: 'email or password incorrect'
          });
          return _context2.abrupt("return");

        case 17:
          _context2.next = 19;
          return regeneratorRuntime.awrap(user.generateToken());

        case 19:
          token = _context2.sent;

          if (!token) {
            _context2.next = 23;
            break;
          }

          res.status(201).json({
            success: true,
            message: 'logged in',
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              token: token
            }
          });
          return _context2.abrupt("return");

        case 23:
          _context2.next = 28;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](4);
          res.status(500).json(_context2.t0.message);

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 25]]);
};

exports.signIn = signIn;

var verify = function verify(req, res) {
  return regeneratorRuntime.async(function verify$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", res.status(201).json({
            success: true,
            user: req.user
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.verify = verify;