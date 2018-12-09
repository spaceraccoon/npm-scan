'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')
const path = require('path')

/**
 * Heuristic metadata.
 */

const name = 'Minified main package script'
const message = 'Package main module export is minified'
const reference = 'https://schneid.io/blog/event-stream-vulnerability-explained/'

/**
 * Scans the file for CSP bypass attempt.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const re = /main": ".*\.min/g
  let result = []
  if (path.basename(filePath) === 'package.json') {
    while ((re.exec(content))) {
      result.push({
        name,
        message,
        reference,
        packageName,
        filePath
      })
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
