'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')

/**
 * Scans package manifest.
 *
 * @param {string} packageName
 * @param {string} dir
 * @param {object} heuristics
 * @return {array} Detected vulnerabilities.
 */

function manifestScan (packageName, dir, heuristics) {
  return new Promise(async (resolve, reject) => {
    let results = []
    let length = heuristics.length
    let filePath = path.join(dir, 'package.json')

    fs.stat(filePath, (err) => {
      if (!err) {
        for (let i = 0; i < length; i++) {
          results.push(heuristics[i].run(packageName, filePath))
        }
      }

      resolve(Promise.all(results))
    })
  })
}

/**
 * Module exports.
 */

module.exports = manifestScan
