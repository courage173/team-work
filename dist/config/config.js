"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

console.log("This is a ".concat(process.env.NODE_ENV, " environment"));
var pool;
var connectionString = "postgresql://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_DATABASE);
var testConnectionString = "postgresql://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/teamworkdb");

if (process.env.NODE_ENV === 'production') {
  pool = new _pg.Pool({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL,
    ssl: process.env.NODE_ENV === 'production'
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new _pg.Pool({
    user: 'kola',
    host: 'localhost',
    database: 'teamworkdb',
    password: 'pedro123',
    port: 5432
  });
} else {
  pool = new _pg.Pool({
    connectionString: connectionString
  });
}

if (!pool) {
  console.log('Database Setup  Was Unsuccessful');
  process.exit(1);
} else {
  pool.on('connect', function () {
    console.log('connected to the Database Successfully');
  });
}

var _default = pool;
exports["default"] = _default;