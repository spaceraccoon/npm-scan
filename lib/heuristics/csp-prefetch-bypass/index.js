'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')
const undom = require('../../utils/undom')

/**
 * Heuristic metadata.
 */

const name = 'CSP prefetch bypass'
const message = 'Bypass Content Security Policy with DNS prefetch'
const priority = 2
const reference = 'https://blog.compass-security.com/2016/10/bypassing-content-security-policy-with-dns-prefetching/'

/**
 * Scans the file for CSP bypass attempt.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {array} Detected vulnerabilities for file.
 */

function run (packageName, filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const re = /rel.*\=.*prefetch/g
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
