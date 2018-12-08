'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')

/**
 * Recursively walks through directory, scanning files with heuristics.
 *
 * @param {string} packageName
 * @param {string} dir
 * @param {object} heuristics
 * @return {array} Detected vulnerabilities.
 */

function recursiveScan (packageName, dir, heuristics) {
  let results = []
  let fileList = fs.readdirSync(dir)
  let i = 0
  let iMax = fileList.length

  for (; i < iMax; i++) {
    let file = fileList[i]
    if (!file) return
    let filePath = path.join(dir, file)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(recursiveScan(packageName, filePath, heuristics))
    } else {
      if (['.js', '.jsx', '.ts', '.tsx', '.mjs'].includes(path.extname(filePath))) {
        results = results.concat(heuristics.reduce(function (result, heuristic) {
          result = result.concat(heuristic.run(packageName, filePath))
          return result
        }, []))
      }
    }
  }

  return results
}

/**
 * Module exports.
 */

module.exports = recursiveScan
