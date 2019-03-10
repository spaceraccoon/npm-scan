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

function recursiveFileScan (packageName, dir, heuristics) {
  let results = []
  const fileList = fs.readdirSync(dir)
  const filesLength = fileList.length
  const heuristicsLength = heuristics.length

  for (let i = 0; i < filesLength; i++) {
    let file = fileList[i]
    if (!file) return
    let filePath = path.join(dir, file)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(recursiveFileScan(packageName, filePath, heuristics))
    } else {
      if (['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json'].includes(path.extname(filePath))) {
        for (let j = 0; j < heuristicsLength; j++) {
          results.push(heuristics[j].run(packageName, filePath))
        }
      }
    }
  }

  return results
}

/**
 * Module exports.
 */

module.exports = recursiveFileScan
