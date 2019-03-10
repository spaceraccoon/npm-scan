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
  let results = []
  const heuristicsLength = heuristics.length
  const filePath = path.join(dir, 'package.json')

  if (fs.existsSync(filePath)) {
    for (let i = 0; i < heuristicsLength; i++) {
      results.push(heuristics[i].run(packageName, filePath))
    }
  }

  return results
}

/**
 * Module exports.
 */

module.exports = manifestScan
