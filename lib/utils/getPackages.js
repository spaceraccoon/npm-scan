'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')

/**
 * Get the top-level package directories.
 *
 * @param {string} packagesDir
 * @return {array}
 */

function getPackages (packagesDir) {
  return fs.readdirSync(packagesDir)
    .filter(function (item) {
      return fs.lstatSync(path.join(packagesDir, item)).isDirectory()
    })
}

/**
 * Module exports.
 */

module.exports = getPackages
