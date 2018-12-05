'use strict'

/**
 * Heuristic metadata.
 */

const name = 'Dummy'
const message = 'Dummy rule for testing'
const priority = 1
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
      priority,
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
  priority,
  reference,
  run
}
