'use strict'

/**
 * Module dependencies.
 */

// const dummy = require('./dummy')
const checkCsp = require('./checkCsp')
const cspPrefetchBypass = require('./cspPrefetchBypass')
const jjencode = require('./jjencode')
const mainMinified = require('./mainMinified')
// const lastUpdated = require('./lastUpdated')
const installScripts = require('./installScripts')

/**
 * Module exports.
 */

module.exports = {
  file: [
    // dummy,
    checkCsp,
    cspPrefetchBypass,
    jjencode
  ],
  manifest: [
    installScripts,
    // lastUpdated,
    mainMinified
  ]
}
