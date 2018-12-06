'use strict'

/**
 * Module dependencies.
 */

// const dummy = require('./dummy')
const jsfuck = require('./jsfuck')
const jjencode = require('./jjencode')
const yaraBeefPettyTheft = require('./yara-beef-petty-theft')
const commandExists = require('../utils/commandExists')

/**
 * Module exports.
 */

module.exports = [
  // dummy,
  jsfuck,
  jjencode
]

if (commandExists('yara')) {
  module.exports = module.exports.concat([yaraBeefPettyTheft])
}
