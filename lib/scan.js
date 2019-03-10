'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveFileScan = require('./utils/recursiveFileScan')
const manifestScan = require('./utils/manifestScan')
const printResults = require('./utils/printResults')
let heuristics = require('./heuristics')
let program = require('commander')

/**
 * Initialize command-line options.
 */

function list (val) {
  return val.split(',')
}

program
  .version('0.1.0')
  .option('-e, --exclude-heuristics <items>', 'comma-separated list of heuristics to exclude', list)
  .option('-v, --verbose', 'print more details for each package scan')
  .parse(process.argv)

/**
 * Scan node_modules directory for vulnerabilities.
 * Supports promises, allowing heuristics with longer processes
 * like HTTP requests to run in parallel.
 */

async function scan () {
  const packagesDir = 'node_modules'
  const packages = getPackages(packagesDir)
  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))
  const packagesLength = packages.length

  let results = []

  // Exclude heuristics as specified in options
  if (program.excludeHeuristics) {
    heuristics.file = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
    heuristics.manifest = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
  }

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
