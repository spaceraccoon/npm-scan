'use strict'

/**
 * Module dependencies.
 */

// const dummy = require('./dummy')
const jsfuck = require('./jsfuck')
const jjencode = require('./jjencode')
const yaraBeefPettyTheft = require('./yara-beef-petty-theft')
const checkCspHeaders = require('./check-csp-headers')
const cspPrefetchBypass = require('./csp-prefetch-bypass')
const mainMinified = require('./main-minified')
const commandExists = require('../utils/commandExists')

/**
 * Module exports.
 */

module.exports.node = [
  // dummy,
  cspPrefetchBypass,
  jsfuck,
  jjencode,
  checkCspHeaders,
  mainMinified
]

if (commandExists('yara')) {
  module.exports.yara = [yaraBeefPettyTheft]
} else {
  module.exports.yara = []
}
