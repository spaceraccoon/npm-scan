'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

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
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }

      const packageManifest = JSON.parse(data)
      const re = /.*\.min/g
      let result = null

      if (packageManifest.main && packageManifest.main.match(re)) {
        result = {
          name,
          message,
          reference,
          packageName,
          filePath
        }
      }

      resolve(result)
    })
  })
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
