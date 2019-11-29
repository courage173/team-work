"use strict";

var generateRandomId = function generateRandomId(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

module.exports = generateRandomId;