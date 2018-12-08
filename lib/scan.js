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
  let yaraResults

  for (; i < iMax; i++) {
    results[packages[i]] = recursiveScan(packages[i], packagePaths[i], heuristics.node)
  }

  heuristics.yara.forEach(function (heuristic) {
    yaraResults = heuristic.run(null, packagesDir)
    yaraResults.forEach(function (yaraResult) {
      results[yaraResult.packageName].push(yaraResult)
    })
  })

  printResults(results)
  return results
}

/**
 * Module exports.
 */

module.exports = scan
