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
  let filePath = path.join(dir, 'package.json')

  if (fs.existsSync(filePath)) {
    results = results.concat(heuristics.reduce(function (result, heuristic) {
      result = result.concat(heuristic.run(packageName, filePath))
      return result
    }, []))
  }
  return results
}

/**
 * Module exports.
 */

module.exports = manifestScan
