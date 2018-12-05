'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveScan = require('./utils/recursiveScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')

/**
 * Scan node_modules directory for vulnerabilities.
 */

function scan () {
  const packagesDir = 'node_modules'

  const packages = getPackages(packagesDir)

  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))

  let i = 0
  let iMax = packagePaths.length
  let results = {}

  for (; i < iMax; i++) {
    results[packages[i]] = recursiveScan(packages[i], packagePaths[i], heuristics)
  }
  printResults(results)
}

/**
 * Module exports.
 */

module.exports = scan
