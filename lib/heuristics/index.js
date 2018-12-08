'use strict'

/**
 * Module dependencies.
 */

// const dummy = require('./dummy')
const jsfuck = require('./jsfuck')
const jjencode = require('./jjencode')
const yaraBeefPettyTheft = require('./yara-beef-petty-theft')
const check_csp_headers = require('./check_csp_headers')
const commandExists = require('../utils/commandExists')

/**
 * Module exports.
 */

module.exports.node = [
  // dummy,
  jsfuck,
  jjencode,
  check_csp_headers
]

if (commandExists('yara')) {
  module.exports.yara = [yaraBeefPettyTheft]
} else {
  module.exports.yara = []
}
