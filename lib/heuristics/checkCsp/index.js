'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'checkCsp'
const message = 'Attempting to retrieve site\'s Content Security Policy'
const reference = 'https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5'

/**
 * Scans the file for attempts to retrieve a site's headers and attempts
 * to search in those header's for the site's Content Security Policy
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {object} Detected vulnerability for file.
 */

function run (packageName, filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  const re = /get\('Content-Security-Policy'\)/g
  let result = null

  if (data.match(re)) {
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
