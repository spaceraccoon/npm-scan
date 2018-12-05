'use strict'

/**
 * Module dependencies.
 */
const path = require('path')
const { spawnSync } = require('child_process')

/**
 * Heuristic metadata.
 */

const name = '(Yara) BeEF Petty Theft'
const message = 'Browser Exploitation Framework Project Petty Theft phishing module'
const priority = 3
const reference = 'https://github.com/beefproject/beef/wiki/Module:-Pretty-Theft'

/**
 * Scans the file for Petty Theft using Yara.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const process = spawnSync('yara', [path.join(__dirname, 'rule.yar'), filePath])
  let result = []

  if (process.stdout.length !== 0) {
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
