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
const priority = 3
const reference = 'https://www.symantec.com/connect/blogs/short-sharp-spam-attacks-aiming-spread-dyre-financial-malware/'

/**
 * Scans the file for jjencode obfuscation.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const re = /\$=~\[\];\$=\{[_]{3}:[+]{2}\$,[$]{4}:\(!\[\]\+["]{2}\)/g
  let result = []
  // console.log('running jjencode')
  while ((re.exec(content))) {
    result.push({
      name,
      message,
      priority,
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
  priority,
  reference,
  run
}
