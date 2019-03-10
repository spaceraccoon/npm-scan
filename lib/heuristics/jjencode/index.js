'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'jjencode'
const message = 'jjencode code obfuscation'
const reference = 'https://www.symantec.com/connect/blogs/short-sharp-spam-attacks-aiming-spread-dyre-financial-malware/'

/**
 * Scans the file for jjencode obfuscation.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {object} Detected vulnerability for file.
 */

function run (packageName, filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  const re = /\$=~\[\];\$=\{[_]{3}:[+]{2}\$,[$]{4}:\(!\[\]\+["]{2}\)/g
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
