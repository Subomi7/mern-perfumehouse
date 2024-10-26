"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  var authHeader, token, payload;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.authorization;

          if (!(!authHeader || !authHeader.startsWith('Bearer'))) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: false,
            errMsg: 'unauthorized'
          }));

        case 3:
          token = authHeader.split(' ')[1];

          try {
            payload = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRETE);
            req.user = {
              userId: payload.userId,
              firstName: payload.firstName,
              lastName: payload.lastName
            };
            next();
          } catch (error) {
            res.status(401).json({
              success: false,
              errMsg: 'Auth Failed'
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.auth = auth;