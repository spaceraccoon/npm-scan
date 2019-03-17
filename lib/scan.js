'use strict'

/**
 * Module dependencies.
 */

const getPackagesInfo = require('./utils/getPackagesInfo')
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
  const packagesInfo = getPackagesInfo(packagesDir)
  const packagesLength = packagesInfo.length

  let resultsArr = []

  // Exclude heuristics as specified in options
  if (program.excludeHeuristics) {
    heuristics.file = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
    heuristics.manifest = heuristics.file.filter(heuristic => !program.excludeHeuristics.includes(heuristic.name))
  }

  for (let i = 0; i < packagesLength; i++) {
    resultsArr = resultsArr.concat(recursiveFileScan(packagesInfo[i].name, packagesInfo[i].path, heuristics.file))
    resultsArr = resultsArr.concat(manifestScan(packagesInfo[i].name, packagesInfo[i].path, heuristics.manifest))
  }

  resultsArr = await Promise.all(resultsArr)
  resultsArr = resultsArr.filter(v => v !== null)

  // remap results to object
  let resultsObj = {}
  let packageKey
  for (let i = 0; i < packagesLength; i++) {
    packageKey = `${packagesInfo[i].name}@${packagesInfo[i].version}`
    resultsObj[packageKey] = resultsArr.filter(v => v.packageName === packagesInfo[i].name)
    resultsObj[packageKey].map(v => delete v.packageName)
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
