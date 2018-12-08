'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'CSP prefetch bypass'
const message = 'Bypass Content Security Policy with DNS prefetch'
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
  const re = /link.*[ .]rel.*=.*prefetch/g
  let result = []

  while ((re.exec(content))) {
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
