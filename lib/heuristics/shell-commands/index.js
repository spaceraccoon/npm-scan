'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'shell-commands'
const message = 'Attempts to run shell commands'
const reference = 'https://news.ycombinator.com/item?id=17283394'

/**
 * Scans the file for attempts to execute shell commands
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {object} Detected vulnerability for file.
 */

function run (packageName, filePath) {
  const data = fs.readFileSync(filePath, 'utf8')

  const re = /child_process/g

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
