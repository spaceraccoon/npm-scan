'use strict'

/**
 * Heuristic metadata.
 */

const name = 'Dummy'
const message = 'Dummy rule for testing'
const reference = 'https://www.google.com/'

/**
 * Dummy scan.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  if (packageName === '__dummy__') {
    return []
  } else {
    return [{
      name,
      message,
      reference,
      packageName,
      filePath
    }]
  }
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
