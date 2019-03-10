'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'mainMinified'
const message = 'Package main module export is minified'
const reference = 'https://schneid.io/blog/event-stream-vulnerability-explained/'

/**
 * Scans the file for CSP bypass attempt.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {object} Detected vulnerability for package.
 */

function run (packageName, filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  const packageManifest = JSON.parse(data)
  const re = /.*\.min/g
  let result = null

  if (packageManifest.main && packageManifest.main.match(re)) {
    result = {
      name,
      message,
      reference,
      packageName,
      filePath
    }
  }

  return result
}

/**
 * Module exports.
 */

module.exports = {
  name,
  message,
  reference,
  run
}
