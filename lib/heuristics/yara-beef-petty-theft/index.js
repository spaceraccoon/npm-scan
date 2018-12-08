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
const reference = 'https://github.com/beefproject/beef/wiki/Module:-Pretty-Theft'

/**
 * Scans the file for Petty Theft using Yara.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const process = spawnSync('yara', ['-r', '-f', path.join(__dirname, 'compiled-rule.yar'), filePath])
  let result = []

  if (process.stdout.length !== 0) {
    result.push({
      name,
      message,
      reference,
      packageName: packageName || process.stdout.toString().split(path.sep)[1],
      filePath: process.stdout.toString().split(' ')[1].trim()
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
