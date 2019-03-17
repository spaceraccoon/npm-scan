'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveFileScan = require('./utils/recursiveFileScan')
const manifestScan = require('./utils/manifestScan')
const printResults = require('./utils/printResults')
const writeResults = require('./utils/writeResults')
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
  .option('-o, --output <file path>', 'file path for JSON output')
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

  let resultsArr = []

  // Exclude heuristics as specified in options
  if (program.excludeHeuristics) {
    heuristics.file = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
    heuristics.manifest = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
  }

  for (let i = 0; i < packagesLength; i++) {
    resultsArr = resultsArr.concat(recursiveFileScan(packages[i], packagePaths[i], heuristics.file))
    resultsArr = resultsArr.concat(manifestScan(packages[i], packagePaths[i], heuristics.manifest))
  }

  resultsArr = await Promise.all(resultsArr)
  resultsArr = resultsArr.filter(v => v !== null)

  // remap results to object
  let resultsObj = {}
  for (let i = 0; i < packagesLength; i++) {
    resultsObj[packages[i]] = resultsArr.filter(v => v.packageName === packages[i])
    resultsObj[packages[i]].map(v => delete v.packageName)
  }

  if (program.output) {
    writeResults(resultsObj, program.output)
  } else {
    printResults(resultsObj, program.verbose)
  }

  return resultsObj
}

/**
 * Module exports.
 */

module.exports = scan
