"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_config["default"].on('error', function (err) {
  console.log(err);
});

var migrate = _config["default"].query("DROP TABLE IF EXISTS users CASCADE;\nCREATE TABLE users(\n    id SERIAL NOT NULL PRIMARY KEY,\n\temail VARCHAR NOT NULL,\n\tfirst_name VARCHAR NOT NULL,\n\tlast_name VARCHAR NOT NULL,\n\tpassword VARCHAR NOT NULL,\n    is_admin BOOLEAN NOT NULL DEFAULT false,\n    department VARCHAR,\n    jobroles VARCHAR,\n    address VARCHAR,\n    gender VARCHAR\n);\nINSERT INTO users (\n    id, email, first_name, last_name, password, is_admin\n    ) VALUES (\n        15,\n        'bosky@gmail.com',\n        'faith',\n        'osemwengie',\n        'developer',\n        true\n);\n\nDROP TABLE IF EXISTS gif CASCADE;\nCREATE TABLE gif (\n\tgif_id serial NOT NULL,\n\ttitle varchar NOT NULL,\n\tgif_url varchar NOT NULL,\n\tcreated_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    flagged BOOLEAN NOT NULL,\n    created_by varchar NOT NULL,\n    public_id varchar NOT NULL,\n    user_id serial NOT NULL,\n    PRIMARY KEY (gif_id),\n    FOREIGN KEY (user_id) \n    REFERENCES users (id)\n    );\n\n    DROP TABLE IF EXISTS gif_comment CASCADE;\n    CREATE TABLE gif_comment (\n        gif_id INTEGER NOT NULL,\n        comment_id serial NOT NULL,\n        comments varchar NOT NULL,        \n        created_on timestamp with time zone NOT NULL,\n        flagged BOOLEAN NOT NULL,\n        created_by varchar NOT NULL,\n        user_id INTEGER NOT NULL,\n        PRIMARY KEY (comment_id),\n        FOREIGN KEY (user_id) \n        REFERENCES users (id)\n        );\n    \n    DROP TABLE IF EXISTS categories CASCADE;\n    CREATE TABLE categories (\n        category_id INTEGER NOT NULL,\n        category_name varchar NOT NULL,        \n        PRIMARY KEY (category_id)\n        );\n\n    DROP TABLE IF EXISTS articles CASCADE;\n    CREATE TABLE articles (\n        article_id integer NOT NULL,\n        title character varying NOT NULL,\n        article character varying NOT NULL,\n        user_id bigint NOT NULL,\n        flagged boolean DEFAULT false NOT NULL,\n        created_on date NOT NULL,\n        category_id integer NOT NULL,\n        created_by character varying NOT NULL,      \n        PRIMARY KEY (article_id),\n        FOREIGN KEY (user_id) \n        REFERENCES users (id)\n       \n        );\n\n    DROP TABLE IF EXISTS article_comment CASCADE;\n    CREATE TABLE article_comment (\n        comment_id integer NOT NULL,\n        article_id bigint NOT NULL,\n        comments character varying NOT NULL,\n        flagged boolean DEFAULT false NOT NULL,\n        user_id integer NOT NULL,\n        created_by character varying NOT NULL,\n        created_on time with time zone NOT NULL,     \n        PRIMARY KEY (comment_id),\n        FOREIGN KEY (user_id) \n        REFERENCES users (id)\n        \n        );\n    \n\n\n");

var _default = migrate;
exports["default"] = _default;