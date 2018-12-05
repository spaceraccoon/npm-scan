'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')

/**
 * Get the top-level package directories.
 *
 * @param {string} packagesDir
 * @return {array}
 */

function getPackages (packagesDir) {
  return fs.readdirSync(packagesDir)
}

/**
 * Module exports.
 */
 
 module.exports = getPackages