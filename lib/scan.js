'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveScan = require('./utils/recursiveScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')

var program = require('commander')

program
  .version('0.1.0')
  .option('-p, --package [name]', 'Scan the specified package [name]')
  .option('-P, --packages [names]', 'Scan the specified packages [name1, name2, etc.]')
  .option('-V, --verbose', 'Print more details for each package scan')
  .parse(process.argv)

/**
 * Scan node_modules directory for vulnerabilities.
 */

function scan () {
  const packagesDir = 'node_modules'
  const allPackages = getPackages(packagesDir)
  const allPackagePaths = allPackages.map((packageName) => path.join(packagesDir, packageName))
  var packages
  var packagePaths

  // If package option is specified, only scan that particular package
  if (typeof program.package !== 'undefined') {
    packages = [program.package]
    packagePaths = [path.join(packagesDir, program.package)]
  } else if (typeof program.packages !== 'undefined') {
    var inputs = program.packages
    var splitInputs = inputs.split(',')

    packages = []
    packagePaths = []
    for (var index = 0; index < splitInputs.length; index++) {
      splitInputs[index].replace(/^\s+|\s+$/g, '')
      packages.push(splitInputs[index])
      packagePaths.push(path.join(packagesDir, splitInputs[index]))
    }
  } else {
    packages = allPackages
    packagePaths = allPackagePaths
  }

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

  printResults(results, program.verbose)
  return results
}

/**
 * Module exports.
 */

module.exports = scan
