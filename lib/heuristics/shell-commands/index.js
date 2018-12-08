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
const priority = 3
const reference = 'https://news.ycombinator.com/item?id=17283394'

/**
 * Scans the file for attempts to execute shell commands
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  const re1 = /child_process/g

  let result = []

  while (re1.exec(content)) {
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
