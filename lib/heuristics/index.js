'use strict'

/**
 * Module dependencies.
 */

// const dummy = require('./dummy')
const jsfuck = require('./jsfuck')
const jjencode = require('./jjencode')
const checkCspHeaders = require('./check-csp-headers')
const cspPrefetchBypass = require('./csp-prefetch-bypass')
const mainMinified = require('./main-minified')

/**
 * Module exports.
 */

module.exports = [
  // dummy,
  cspPrefetchBypass,
  jsfuck,
  jjencode,
  checkCspHeaders,
  mainMinified
]
