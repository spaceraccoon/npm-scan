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
const lastUpdated = require('./last-updated')

/**
 * Module exports.
 */

module.exports = {
  file: [
    // dummy,
    checkCspHeaders,
    cspPrefetchBypass,
    jjencode,
    jsfuck
  ],
  manifest: [
    lastUpdated,
    mainMinified
  ]
}
