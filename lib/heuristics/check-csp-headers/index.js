'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'checkCspHeaders'
const message = 'Attempting to retrieve site\'s Content Security Policy'
const reference = 'https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5'

/**
 * Scans the file for attempts to retrieve a site's headers and attempts
 * to search in those header's for the site's Content Security Policy
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  const re1a = /getAllResponseHeaders/g
  const re1b = /.get\(/g
  const re2 = /content-security-policy/g

  let result = []

  while (((re1a.exec(content)) || re1b.exec(content)) && re2.exec(content)) {
    result.push({
      name,
      message,
      reference,
      packageName,
      filePath
    })
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
