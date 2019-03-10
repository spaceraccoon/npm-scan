'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveFileScan = require('./utils/recursiveFileScan')
const manifestScan = require('./utils/manifestScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')
var program = require('commander')

/**
 * Initialize command-line options.
 */

program
  .version('0.1.0')
  .option('-v, --verbose', 'Print more details for each package scan')
  .parse(process.argv)

/**
 * Scan node_modules directory for vulnerabilities.
 */

async function scan () {
  const packagesDir = 'node_modules'
  const packages = getPackages(packagesDir)
  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))
  const packagesLength = packages.length

  let results = []

  for (let i = 0; i < packagesLength; i++) {
    results = results.concat(recursiveFileScan(packages[i], packagePaths[i], heuristics.file))
    results = results.concat(manifestScan(packages[i], packagePaths[i], heuristics.manifest))
  }

  results = await Promise.all(results)
  results = results.filter(v => v !== null)
  printResults(results, program.verbose)
  return results
}

/**
 * Module exports.
 */

module.exports = scan
