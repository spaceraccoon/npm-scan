'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'JSFuck'
const message = 'JSFuck code obfuscation'
const reference = 'https://blog.checkpoint.com/2016/02/02/ebay-platform-exposed-to-severe-vulnerability/'

/**
 * Scans the file for JSFuck obfuscation.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const threshold = 10
  const content = fs.readFileSync(filePath, 'utf8')
  const re = /([!+[\]()])(?:(?!\1)([!+[\]()])+)/g
  let match
  let result = []

  while ((match = re.exec(content))) {
    if (match[0].length >= threshold) {
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
